import { TRIGGER_SQUARE, SELECT_GAME_MODE } from './actions'

import {
  recalculateSquares,
  generateSquares,
  calculateWin
} from '../utils'

const initializaState = (mode = 16) => ({
  squares: generateSquares(mode),
  steps: 0,
  won: false,
  topList: {}
})

const INITIAL_STATE = initializaState()

const board = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_GAME_MODE: {
      const {gameMode} = action
      return {
        ...state,
        squares: generateSquares(gameMode),
        steps: 0,
        won: false
      }
    }

    case TRIGGER_SQUARE: {
      const {steps} = state
      let {squares, topList} = state
      const {index} = action
      squares = recalculateSquares(squares, index)
      const newSteps = steps + 1
      const won = calculateWin(squares)

      if (won) {
        const list = Object.keys(topList).includes('' + squares.length) ? topList[squares.length] : []
        const newList = [
          ...list,
          {
            play: list.length,
            score: newSteps
          }
        ].sort((a, b) => a.score > b.score)
          .slice(0, 5)

        topList = {
          ...topList,
          [squares.length]: newList
        }
      }

      return {
        ...state,
        squares,
        won,
        steps: newSteps,
        topList
      }
    }

    default:
      return state
  }
}

export default {
  board
}
