import {ref,reactive,watch} from 'vue';
import { useMouseInElement } from "@vueuse/core";

export const useGoodsImage=(target,show)=>{
    const layerPosition = reactive({
        left: 0,
        top: 0
      })
      // 大图背景定位
      const largePosition = reactive({
        backgroundPositionX: 0,
        backgroundPositionY: 0
      })
      // 使用useMouseInElement
      
      const {
        elementX,
        elementY,
        isOutside
      } = useMouseInElement(target)
      watch([elementX, elementY, isOutside], () => {
        show.value = !isOutside.value
        const position = { x: 0, y: 0 }
  
        if (elementX.value < 100) {
          position.x = 0
        } else if (elementX.value > 300) {
          position.x = 200
        } else {
          position.x = elementX.value - 100
        }
        // 算坐标
        if (elementY.value < 100) {
          position.y = 0
        } else if (elementY.value > 300) {
          position.y = 200
        } else {
          position.y = elementY.value - 100
        }
  
        // mask坐标
        layerPosition.left = position.x + 'px'
        layerPosition.top = position.y + 'px'
  
        // 大图坐标
        largePosition.backgroundPositionX = -2 * position.x + 'px'
        largePosition.backgroundPositionY = -2 * position.y + 'px'
      })

      return{largePosition,layerPosition}
}