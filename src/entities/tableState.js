import Enum from 'enum'

const TableState = new Enum({
  'PRE_FLOP': 'PRE_FLOP',
  'FLOP': 'FLOP',
  'RIVER': 'RIVER',
  'TURN': 'TURN',
  'SHOWDOWN': 'SHOWDOWN'
})

export default TableState;
