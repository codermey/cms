<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import useMainStore from '@/store/main/main'
import { formatDate } from '@/utils/format-date'
import usePermissions from '@/hooks/usePermissions'
import type { IContentConfig } from './type'

interface IContentprops {
  contentConfig: IContentConfig
}

// props
const props = defineProps<IContentprops>()
const { pageName, header, tableList } = toRefs(reactive(props.contentConfig))
// emit事件
const emit = defineEmits(['newClick', 'editClick'])

// 按钮权限 ===> 增删改查
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

const mainStore = useMainStore()
// 初始化列表数据展示
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserList()

// 获取用户列表，用户列表总数
const { pageList, pageTotalCount } = storeToRefs(mainStore)

// 改变页数
const handleSizeChange = () => {
  fetchUserList()
}
// 改变当前页码
const handleCurrentChange = () => {
  fetchUserList()
}

// 删除网络请求
const deleteUser = (id: number) => {
  mainStore.delete(pageName.value, id).then((res) => {
    fetchUserList()
    ElMessage({
      message: res.data,
      type: res.code === 0 ? 'success' : 'error'
    })
  })
}

// 点击新建按钮
const newUserClick = () => {
  emit('newClick')
}

// 点击编辑按钮
const editUserClick = (formItem: any) => {
  emit('editClick', formItem)
}

// 获取列表数据网络请求
function fetchUserList(searchForm = {}) {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  mainStore.postList(pageName.value, {
    size,
    offset,
    ...searchForm
  })
}
defineExpose({
  fetchUserList
})
</script>

<template>
  <div class="page-content">
    <el-card>
      <div class="header">
        <h4>{{ header.title }}</h4>
        <el-button type="primary" size="large" @click="newUserClick" v-if="isCreate">
          {{ header.btnText }}
        </el-button>
      </div>
      <el-table
        :data="pageList"
        :row-key="contentConfig.childrenTree?.rowKey"
        border
        style="width: 100%"
      >
        <template v-for="item in tableList" :key="item.prop">
          <template v-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatDate(scope.row.createAt) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handle'">
            <el-table-column label="操作" align="center" width="130">
              <template #default="scope">
                <el-button
                  type="primary"
                  icon="Edit"
                  link
                  size="small"
                  @click="editUserClick(scope.row)"
                  v-if="isUpdate"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  icon="Delete"
                  link
                  size="small"
                  @click="deleteUser(scope.row.id)"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center" />
          </template>
        </template>
      </el-table>
      <template v-if="pageTotalCount">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotalCount"
          small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.page-content {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h4 {
      font-size: 20px;
    }
  }
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
