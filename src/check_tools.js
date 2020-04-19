export default class check {
	/**
     * 检查是否有选择删除的数据
     * @param length {number} $Message {object}
     * @returns {boolean}
     */
    static check_arr_length_func(length) {
        if (length === 0) {            
            return false
        } else {
            return true
        }
    }
}