# ELTable单元格宽度根据单元格内容响应式变化

1. 给 `el-table` 标签添加一个自定义类名,用于查找到 `.cell` 类，使其渲染单元格内容的所需的实际宽度

   ```jsx
   <template>
       <el-table class="custom-table"></el-table>
   </template>

   <style scoped>
   .custom-table {
       & :deep(.cell) {
           white-space: nowrap;
           overflow-x: auto;
       }
   }
   ```

2. 给 `el-table` 标签新增一个 `ref` 标签，用于获取该组件的模板

   ```jsx
   <template>
       <el-table ref="elTable" class="custom-table"></el-table>
   </template>

   <style scoped>
   .custom-table {
       & :deep(.cell) {
           white-space: nowrap;
           overflow-x: auto;
       }
   }
   ```

3. 编写一个组合式函数，该组合式函数会返回一个 `autoWidths` 数组和一个 `recalculate` 方法

   1. 注意：如果非 `vue3.5+` 版本，可能没有 `useTemplateRef` 函数的支持，需要使用 `const elTableRef =ref(null)`

   ```jsx
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
           return maxWidth + 24 // 这个padding是el-table自带的左右padding12px，可根据样式修改
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
   ```

4. 使用该组合式函数

   ```jsx
   <template>
       <el-table class="custom-table">
           <el-table-column label="姓名" :width="autoWidths[0]" />
           <el-table-column label="备注" :width="autoWidths[1]" />
       </el-table>
   </template>

   <script>
   //...省略了导入的内容

   const { autoWidths, recalculate } = useAutoTableColWidth('elTable');

   // 当我们使用el-pagination进行分页切换时，可以在fetchData（异步获取数据的函数）后触发recalculate，即可实现width的响应式变化
   </script>

   <style scoped>
   .custom-table {
       & :deep(.cell) {
           white-space: nowrap;
           overflow-x: auto;
       }
   }
   ```

> 欢迎各位大佬的指导。
