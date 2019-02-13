export default `\
#define SHADER_NAME rect-fragment-shader

precision highp float;

uniform float cornerRadius;

varying vec4 vColor;
varying vec2 unitPosition;

void main(void) {

  float threshold = sqrt(2.0) * (1.0 - cornerRadius) + 1.0 * cornerRadius;
  float distToCenter = length(unitPosition);

  if (distToCenter <= threshold) {
    gl_FragColor = vColor;
  } else {
    discard;
  }
}
`;
