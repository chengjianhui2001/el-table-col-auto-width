import { ref, useTemplateRef, onMounted, nextTick } from 'vue'
/**
 * 自动计算 Element Plus el-table 各列宽度的组合式函数。
 *
 * @param {string} refValue - el-table 组件绑定的 ref 名称（如 'elTable'）。
 * @returns {{ autoWidths: import('vue').Ref<number[]> }} 返回 autoWidths 响应式数组，存储每一列的自适应宽度。
 *
 * 该函数会在组件挂载后自动查找表格 DOM，遍历每一列，
 * 统计所有单元格内容的最大 scrollWidth，并加上 24px 作为列宽，
 * 结果存入 autoWidths。
 *
 * 注意：依赖 el-table 渲染完成，若表格内容异步变化需手动触发 recalculate。
 */
export function useAutoTableColWidth(refValue) {
    const elTableRef = useTemplateRef(refValue)
    const autoWidths = ref([])

    // 计算宽度的独立方法
    function recalculate() {
        setTimeout(() => {
            const elTableEl = elTableRef.value?.$el
            if (!elTableEl) return
            const colgroup = elTableEl.querySelector('colgroup')
            if (!colgroup) return
            const cols = [...colgroup.querySelectorAll('col')]
            const newWidths = cols.map((col) => {
                const colName = col.getAttribute('name')
                const cells = [
                    ...elTableEl.querySelectorAll(`td.${colName}`),
                    ...elTableEl.querySelectorAll(`th.${colName}`),
                ]
                const widthList = cells.map((cell) => cell.querySelector('.cell')?.scrollWidth || 0)
                const maxWidth = Math.max(...widthList)
                return maxWidth + 16 // 这个padding是el-table自带的左右padding12px，可根据样式修改
            })
            autoWidths.value = newWidths
        })
    }

    onMounted(async () => {
        await nextTick()
        recalculate()
    })

    return { autoWidths, recalculate }
}
