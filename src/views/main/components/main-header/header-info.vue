<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()

// 退出登录
const router = useRouter()
const logOut = () => {
  localCache.removeCache('token')
  router.replace('/login')
}
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <el-icon size="20"><Bell /></el-icon>
      <el-icon size="20"><ChatDotRound /></el-icon>
      <el-icon size="20"><Message /></el-icon>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">{{ loginStore.userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">
              <template #default>
                <el-icon><CircleClose /> </el-icon>
                <span class="text">退出系统</span>
              </template>
            </el-dropdown-item>
            <el-dropdown-item>
              <template #default>
                <el-icon><InfoFilled /></el-icon>
                <span class="text">个人信息</span>
              </template>
            </el-dropdown-item>
            <el-dropdown-item>
              <template #default>
                <el-icon><Unlock /></el-icon>
                <span class="text">修改密码</span>
              </template>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  padding-right: 18px;
  .operation {
    margin-right: 20px;
    .el-icon {
      width: 40px;
      height: 35px;
    }
    .el-icon:hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }
  }
  .info {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        margin-left: 8px;
      }
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
