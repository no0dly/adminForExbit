// import moment from 'moment'
export default {
  sort(type, arr) {
    const defaultSort = (a, b) => {
      if (Number(a.price) > Number(b.price)) {
        return -1
      } else if (Number(a.price) < Number(b.price)) {
        return 1
      } else {
        return 0
      }
    }

    const decreaseSort = (a, b) => {
      if (Number(a.price) < Number(b.price)) {
        return -1
      } else if (Number(a.price) > Number(b.price)) {
        return 1
      } else {
        return 0
      }
    }

    if (type === 'increase') {
      return arr.sort(defaultSort)
    } else if (type === 'decrease') {
      return arr.sort(decreaseSort)
    } else {
      return arr
    }
  }
}
