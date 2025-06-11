<template>
    <div class="app-container">
        <el-table :data="tableData" ref="elTable" class="custom-table" border>
            <el-table-column v-for="(col, index) in columns" :key="col.prop" :prop="col.prop" :label="col.label"
                :width="autoWidths[index]" align="center" />
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAutoTableColWidth } from './composables/useElTableColAutoWidth'

const { autoWidths } = useAutoTableColWidth('elTable')

const columns = [
    { label: '姓名', prop: 'name' },
    { label: '年龄', prop: 'age' },
    { label: '性别', prop: 'gender' },
    { label: '邮箱', prop: 'email' },
    { label: '电话', prop: 'phone' },
    { label: '地址', prop: 'address' },
    { label: '公司', prop: 'company' },
    { label: '职位', prop: 'position' },
    { label: '入职日期', prop: 'entryDate' },
    { label: '状态', prop: 'status' },
    { label: '学历', prop: 'education' },
    { label: '部门', prop: 'department' },
    { label: '工号', prop: 'employeeId' },
    { label: '籍贯', prop: 'nativePlace' },
    { label: '婚姻状况', prop: 'maritalStatus' },
    { label: '紧急联系人', prop: 'emergencyContact' },
    { label: '紧急联系电话', prop: 'emergencyPhone' },
    { label: '合同类型', prop: 'contractType' },
    { label: '合同到期', prop: 'contractEnd' },
    { label: '备注', prop: 'remark' }
]

const tableData = ref([
    {
        name: '张三',
        age: 28,
        gender: '男',
        email: 'zhangsan@example.com',
        phone: '13800138000',
        address: '北京市朝阳区',
        company: '字节跳动',
        position: '前端工程师',
        entryDate: '2021-03-15',
        status: '在职',
        education: '本科',
        department: '技术部',
        employeeId: '10001',
        nativePlace: '河北',
        maritalStatus: '未婚',
        emergencyContact: '王五',
        emergencyPhone: '13700137000',
        contractType: '正式',
        contractEnd: '2026-03-15',
        remark: '无'
    },
    {
        name: '李四',
        age: 32,
        gender: '女',
        email: 'lisi@example.com',
        phone: '13900139000',
        address: '上海市浦东新区',
        company: '阿里巴巴',
        position: '产品经理',
        entryDate: '2019-07-01',
        status: '离职',
        education: '硕士',
        department: '产品部',
        employeeId: '10002',
        nativePlace: '江苏',
        maritalStatus: '已婚',
        emergencyContact: '赵六',
        emergencyPhone: '13600136000',
        contractType: '合同工',
        contractEnd: '2024-07-01',
        remark: '表现优秀'
    },
    {
        name: '王五',
        age: 26,
        gender: '男',
        email: 'wangwu@example.com',
        phone: '13700137001',
        address: '广州市天河区',
        company: '腾讯',
        position: '后端工程师',
        entryDate: '2022-01-10',
        status: '在职',
        education: '硕士',
        department: '研发部',
        employeeId: '10003',
        nativePlace: '广东',
        maritalStatus: '未婚',
        emergencyContact: '李四',
        emergencyPhone: '13900139000',
        contractType: '正式',
        contractEnd: '2027-01-10',
        remark: '新员工'
    },
    {
        name: '赵六',
        age: 35,
        gender: '女',
        email: 'zhaoliu@example.com',
        phone: '13500135000',
        address: '深圳市南山区',
        company: '华为',
        position: '测试工程师',
        entryDate: '2018-05-20',
        status: '在职',
        education: '博士',
        department: '测试部',
        employeeId: '10004',
        nativePlace: '湖南',
        maritalStatus: '已婚',
        emergencyContact: '张三',
        emergencyPhone: '13800138000',
        contractType: '正式',
        contractEnd: '2028-05-20',
        remark: '技术骨干'
    },
    {
        name: '孙七',
        age: 30,
        gender: '男',
        email: 'sunqi@example.com',
        phone: '13400134000',
        address: '杭州市西湖区',
        company: '网易',
        position: '运维工程师',
        entryDate: '2020-09-01',
        status: '在职',
        education: '本科',
        department: '运维部',
        employeeId: '10005',
        nativePlace: '浙江',
        maritalStatus: '未婚',
        emergencyContact: '王五',
        emergencyPhone: '13700137001',
        contractType: '正式',
        contractEnd: '2025-09-01',
        remark: '无'
    },
    {
        name: '周八',
        age: 29,
        gender: '女',
        email: 'zhouba@example.com',
        phone: '13300133000',
        address: '成都市高新区',
        company: '京东',
        position: 'UI设计师',
        entryDate: '2023-02-18',
        status: '在职',
        education: '本科',
        department: '设计部',
        employeeId: '10006',
        nativePlace: '四川',
        maritalStatus: '未婚',
        emergencyContact: '孙七',
        emergencyPhone: '13400134000',
        contractType: '正式',
        contractEnd: '2028-02-18',
        remark: '新入职'
    },
    {
        name: '钱九',
        age: 40,
        gender: '男',
        email: 'qianjiu@example.com',
        phone: '13200132000',
        address: '重庆市渝中区',
        company: '美团',
        position: '架构师',
        entryDate: '2015-11-11',
        status: '在职',
        education: '硕士',
        department: '架构部',
        employeeId: '10007',
        nativePlace: '重庆',
        maritalStatus: '已婚',
        emergencyContact: '赵六',
        emergencyPhone: '13500135000',
        contractType: '正式',
        contractEnd: '2030-11-11',
        remark: '核心成员'
    }
])

</script>

<style scoped>
.app-container {
    padding: 32px;
    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
    height: calc(100vh - 64px);
    display: flex;
    justify-content: center;

    .custom-table {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
        font-size: 15px;

        & :deep(.cell) {
            white-space: nowrap;
            overflow-x: auto;
        }
    }


}
</style>
