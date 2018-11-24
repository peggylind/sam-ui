//maybe need to bring in the props directly to get onHover and onClick to work???


import {ScatterplotLayer} from 'deck.gl';
import rectFragmentShader from './rect_layer_fragment';

export default class RoundedRectangleLayer extends ScatterplotLayer {

  initializeState(context) {
    super.initializeState(context);
  }

  draw({uniforms}) {
    super.draw({
      uniforms:
        {
        ...uniforms,
        cornerRadius: this.props.cornerRadius
        }
    })
  }


  // shouldUpdateState({props, oldProps, context, oldContext, changeFlags}){
  //   return super.shouldUpdateState
  // }

  getShaders() {
    // use object.assign to make sure we don't overwrite existing fields like `vs`, `modules`...
    const shaders = Object.assign({}, super.getShaders(), {
      fs: rectFragmentShader
    });
    return shaders;
  }
}

RoundedRectangleLayer.defaultProps = {
  ...ScatterplotLayer.defaultProps,
  // cornerRadius: the amount of rounding at the rectangle corners
  // 0 - rectangle. 1 - circle.
  cornerRadius: 0.2
}
