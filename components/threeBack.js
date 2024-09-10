"use client"; 
import React, { Component, createRef } from 'react';
import * as THREE from 'three'; 

class BackgroundComponent extends Component {
  constructor(props) {
    super(props);
    this.containerRef = createRef()
    this.state ={
        time: 0
    }
  }

  componentDidMount() {
    this.container = this.containerRef.current;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.dispScene = new THREE.Scene();
    this.scene = new THREE.Scene();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 100, 2000);
    this.camera.position.set(0, 0, 600);
    this.manager = new THREE.LoadingManager();
    this.loader = new THREE.Curve(this.manager);
    this.time = 0;
    this.mouse = new THREE.Vector2();
    this.prevMouse = new THREE.Vector2();
    this.total = 100;
    this.currentSmoke = 0;
    this.s = 0;
    this.renderTex = new THREE.RenderTarget(this.width, this.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    this.addBg();
    this.addSmoke();
    this.animate();
  }

  addSmoke() {
    this.smoke = true;
    // const t = this.data.data.media;
    // const e = window.TEXTURES[t][0];
    const i = new THREE.Vector2(55, 57); // Create a Vector2 with appropriate dimensions

    this.dispM = [];
    for (let t = 0; t < this.total; t++) {
      let smokeParticle = new THREE.Mesh(
        new THREE.BufferGeometry(i.x, i.y), // Use PlaneBufferGeometry
        new THREE.MeshBasicMaterial({
        //   map: e,
          transparent: true,
          blending: THREE.NormalBlending, // Use appropriate blending mode
          depthTest: false,
          depthWrite: false,
        })
      );

      smokeParticle.visible = false;
      this.dispM.push(smokeParticle);
      this.dispScene.add(smokeParticle);
    }
  }

  addBg() {
     // Create a shader material for the background
     this.material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable",
        },
        uniforms: {
          time: {
            value: 0,
          },
          tex: {
            value: null,
          },
          t: {
            value: 0,
          },
          t2: {
            value: 0,
          },
          pt: {
            value: 0,
          },
          st: {
            value: 0,
          },
          ps: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
          r: {
            value: 0,
          },
          fc: {
            value: 0,
          },
          vc1: {
            value: new THREE.Vector2(0.5, 0.5),
          },
          vc2: {
            value: new THREE.Vector2(0, 1),
          },
          vc3: {
            value: new THREE.Vector2(1, 0),
          },
          c1: {
            value: new THREE.Vector4(0, 0, 0, 1),
          },
          c2: {
            value: new THREE.Vector4(0.3, 0.3, 0.3, 0.95),
          },
        },
        transparent: true,
        vertexShader: `
          #define GLSLIFY 1
          uniform float t;
          uniform float t2;
          uniform float time;
          uniform float pt;
          varying vec2 vUv;
          
          float ea1(float x) {
            return x < 0.5 ? 16. * x * x * x * x * x : 1. - pow(-2. * x + 2., 5.) / 2.;
          }
          
          float ea2(float x) {
            return x < 0.5 ? 8. * x * x * x * x : 1. - pow(-2. * x + 2., 4.) / 2.;
          }
          
          float pi = 3.14159265359;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z -= 85.;
            vec2 ct = vec2(0.5);
            float p = ea1(t);
            float p2 = ea2(t2);
            float np = min(2. * p2, 2. * (1. - p2));
            pos.y -= .15 * sin(uv.x * pi + 0.25) * np;
            pos.y += 1. * (1. - p);
            float nPt = min(2. * pt, 2. * (1. - pt));
            // pos.x *= 1. -(0.05 * (pt));
            float dist = distance(vUv, ct);
            float md = length(ct);
            float nd = dist / md;
            float b = nd * 150.;
            float c = -nd * 150.;
            float fm = mix(c, b, pt);
            // pos.z -= fm * nPt;
            float dt = distance(vec2(uv), vec2(0.5)) * 1.25;
            pos.z -= dt * 85. * pt;
            pos.y *= 1. + (0.11 * pt);
            gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
          }
        `,
        fragmentShader: `
          #define GLSLIFY 1
          #define PI 3.14159265359
          #define PI2 6.28318530718
          uniform float time;
          uniform float pt;
          uniform float st;
          uniform sampler2D tex;
          uniform vec2 ps;
          uniform float r;
          uniform float fc;
          uniform vec2 vc1;
          uniform vec2 vc2;
          uniform vec2 vc3;
          uniform vec4 c1;
          uniform vec4 c2;
          varying vec2 vUv;
          
          float rand(vec2 st){
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }
          
          float ns(vec2 p){
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            
            float res = mix(
              mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
              mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),
              u.y
            );
            return res*res;
          }
          
          float ub( vec2 p, vec2 b, float r ){
            return length(max(abs(p)-b+r,0.0))-r;
          }
          
          vec4 la(vec4 frg, vec4 bc) {
            return frg * frg.a + bc * (1.0 - frg.a);
          }
          
          float aastep(float threshold, float value) {
            float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
            return smoothstep(threshold-afwidth, threshold+afwidth, value);
          }
          
          float sw(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness, float side){
            vec2 d = pt - center;
            float theta = time * .25 * side;
            vec2 p = vec2(cos(theta), -sin(theta))*radius;
            float h = clamp( dot(d,p)/dot(p,p), 0.0, 1.0 );
            //float h = dot(d,p)/dot(p,p);
            float l = length(d - p*h);
          
            float gradient = 0.0;
            const float gradient_angle = PI * .25;
          
            if (length(d)<radius){
              float angle = mod(theta + atan(d.y, d.x), PI2);
              gradient = clamp(gradient_angle - angle, 0.0, gradient_angle)/gradient_angle * 0.5;
            }
          
            return gradient + 1.0 - smoothstep(line_width, line_width+edge_thickness, l);
          }
          
          void main(){
            vec2 m = vUv;
            vec2 m2 = vUv;
          
            vec4 n = texture2D(tex, vUv);
            float z = n.r * 2. * PI;
            vec2 dr = vec2(sin(z));
            vec2 uv = vUv + dr * n.r * 0.1;
            float d1 = distance(uv, vc1);
            float d2 = distance(uv, vc2);
            float d3 = distance(uv, vc3);
            float gr = mix(-0.2, 0.2, rand(uv + sin(time)));
            vec2 mv = vec2(time *0.05, time * -0.05);
            float f = ns((uv * d1 * 2.) + mv);
            f += ns((uv * d2 * 2.5) + vec2(time * -0.075, time * 0.05));
            f += gr;
            f = smoothstep(0., 2., f);
            // f = fract(f);
            float mx = smoothstep(0., 0.1, f) - smoothstep(0.5, 1., f);
            vec4 color = mix(c1, c2, f);
            float nPt = min(2. * pt, 2. * (1. - pt));
            float u = .3 * sin(m.x * PI + 0.25) * nPt;
            float d = -.3 * sin(m.x * PI + 0.25) * nPt;
            m.y -= mix(u, d, st);
            float ft = step(m.y, pt);
            vec2 rs = ps * (0.5 - vec2(fc * 0.35, fc));
            vec2 rs2 = ps * (0.5 - vec2(fc * 0.35, fc));
            float ra = r;
            vec2 yl = vUv;
            yl.y += 0.002;
            yl.x += 0.00125;
            float cr = ub(((vUv - vec2(fc * 0.35, fc * 0.75)) * ps) - rs, rs, ra);
            float cr2 = ub(((yl - vec2(fc * 0.35, fc * 0.75)) * vec2(ps.x * 0.99725, ps.y * 0.995)) - rs2, rs2, ra);
            cr = clamp(cr, 0.0, 1.);
            cr2 = clamp(cr2, 0.0, 1.);
            vec4 br = vec4(0.,0.,0.,0.);
            vec4 s1 =  mix(color, vec4(0.,0.,0., 1.), ft);
            vec3 brcl = vec3(77. / 255.);
            brcl += sw(yl, vec2(0.5), 1.5, 0.00003,0.00001, 1.) * vec3(85./255.);
            vec4 final = mix(s1, la(mix(vec4(brcl,1.), vec4(0.), cr2),vec4(0.,0.,0.,1.)), cr);
          
            float alpha = 1.;
            float cut = 0.001;
            alpha *= aastep(cut, m2.x);
            alpha *= 1. - aastep(1. - cut, m2.x);
            alpha *= aastep(cut, m2.y);
            alpha *= 1. - aastep(1. - cut, m2.y);
          
            gl_FragColor =  vec4(final.rgb, alpha);
          }
        `,
      });
  
      // Create a geometry for the background
      this.geometry = new THREE.PlaneGeometry(this.width, this.height, 30, 30);
  
    // Create a mesh using the geometry and material
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Scale the mesh to match the window size
    this.mesh.scale.set(window.innerWidth, window.innerHeight, 1);

    // Add the mesh to the scene
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // Update your animation here
    // this.material.uniforms.time.value += 0.01; // Example animation
    this.renderer.render(this.scene, this.camera);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.animate)
  }

  
  render() {
    return (
      <div ref={this.containerRef}>
   
      </div>
    );
  }
}

export default BackgroundComponent;