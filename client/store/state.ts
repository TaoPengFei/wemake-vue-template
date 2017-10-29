export interface State {
  count: number
}

function createState (): State {
  return { count: 0 }
}

export default createState
