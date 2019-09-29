<template>
  <div>
    <el-tabs type="border-card" tab-position="left" :stretch="true" style="min-height: 480px" @tab-click="switchTab">
      <el-tab-pane label="预约情况">
        <el-table :data="rsvRecords" ref="revRecords">
          <el-table-column label="编号"  min-width="60" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column label="预约时间"  min-width="280" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.submit_time}}</div>
            </template>
          </el-table-column>
          <el-table-column label="使用时间" min-width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.time === 'AM'">{{scope.row.date}},上午</div>
              <div v-if="scope.row.time === 'PM'">{{scope.row.date}},下午</div>
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <el-table-column label="姓名" min-width="80" align="center">
              <template slot-scope="scope">
                 <div>{{scope.row.operator.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="ID" min-width="120" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.operator.id}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="状态" min-width="70" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.checked" style="color:green">已通过</div>
              <div v-if="!scope.row.checked" style="color:red">未通过</div>
            </template>
          </el-table-column>
          <el-table-column label="备注" min-width="70" align="center">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="click" width="120">
                <div>{{scope.row.note}}</div>
                <el-button slot="reference" size="small" type="primary" :plain="true" :disabled="scope.row.note===''">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="danger" :plain="true" @click="removeRsv(scope.row.id)">取消</el-button>
            </template>
          </el-table-column>         
        </el-table>
        <el-pagination 
          :total="rsvTotal" 
          :current-page="rsvCurrentPage" 
          :page-size="recordPerPage" 
          @current-change="handleRsvCurrentChange" 
          :pager-count=11 
          layout="prev, pager, next, jumper, ->, total" 
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="使用记录"> 
        <el-table :data="usgRecords" ref="usgRecords">
          <el-table-column label="编号"  min-width="60" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column label="签到时间"  min-width="190" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.start_time}}</div>
            </template>
          </el-table-column>
          <el-table-column label="签退时间" min-width="190" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.end_time}}</div>
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <el-table-column label="姓名" min-width="80" align="center">
              <template slot-scope="scope">
                 <div>{{scope.row.operator.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="ID" min-width="120" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.operator.id}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注" min-width="70" align="center">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="click" width="120">
                <div>{{scope.row.note}}</div>
                <el-button slot="reference" size="small" type="primary" :plain="true">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>   
          <el-table-column label="打印机" align="center">
            <el-table-column label="编号" min-width="60" align="center">
              <template slot-scope="scope">
                 <div>{{scope.row.machine.id}}</div>
              </template>
            </el-table-column>
            <el-table-column label="当前状态" min-width="80" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.machine.available" style="color: green">可用</div>
                <div v-if="!scope.row.machine.available" style="color: red">不可用</div>
              </template>
            </el-table-column>
            <el-table-column label="备注" min-width="70" align="center">
              <template slot-scope="scope">
                <el-popover placement="right" trigger="click" width="120">
                  <div>{{scope.row.machine.note}}</div>
                  <el-button slot="reference" size="small" type="primary" :plain="true" :disabled="scope.row.machine.note===''">查看</el-button>
                </el-popover>
              </template>
            </el-table-column>
          </el-table-column>    
        </el-table>
        <el-pagination 
          :total="usgTotal" 
          :current-page="usgCurrentPage" 
          :page-size="recordPerPage" 
          @current-change="handleUsgCurrentChange" 
          :pager-count=11 
          layout="prev, pager, next, jumper, ->, total" 
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="违约记录" ref="brc">
        <el-table :data="brcRecords" ref="brcRecords">
          <el-table-column label="编号"  min-width="60" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column label="预约时间"  min-width="280" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.submit_time}}</div>
            </template>
          </el-table-column>
          <el-table-column label="使用时间" min-width="160" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.time === 'AM'">{{scope.row.date}},上午</div>
              <div v-if="scope.row.time === 'PM'">{{scope.row.date}},下午</div>
            </template>
          </el-table-column>
          <el-table-column label="使用人" align="center">
            <el-table-column label="姓名" min-width="80" align="center">
              <template slot-scope="scope">
                 <div>{{scope.row.operator.name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="ID" min-width="120" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.operator.id}}</div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注" min-width="70" align="center">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="click" width="120">
                <div>{{scope.row.note}}</div>
                <el-button slot="reference" size="small" type="primary" :plain="true" :disabled="scope.row.note===''">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>   
        </el-table>
        <el-pagination 
          :total="brcTotal" 
          :current-page="brcCurrentPage" 
          :page-size="recordPerPage" 
          @current-change="handleBrcCurrentChange" 
          :pager-count=11 
          layout="prev, pager, next, jumper, ->, total" 
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'ReservationRecord',
  data(){
    return {
      rsvRecords:[],
      rsvTotal: 0,

      usgRecords:[],
      usgTotal:0,

      brcRecords:[],
      brcTotal:0,
      rsvCurrentPage: 1,
      recordPerPage: 10,
      usgCurrentPage: 1,
      brcCurrentPage: 1,
    }
  },
  created() {
    this.queryReserveInfo()
  },
  methods: {
    switchTab(tab){
      switch (tab.index) {
      case '0':
        this.queryReserveInfo()         
        break
      case '1':
        this.queryUsageInfo()
        break
      case '2':
        this.queryBrcInfo()
        break
      default:
        break
      }
    },
    handleRsvCurrentChange(val){
      this.rsvCurrentPage = val
    },
    handleUsgCurrentChange(val){
      this.usgCurrentPage = val
    },
    handleBrcCurrentChange(val){
      this.brcCurrentPage = val
    },
    queryReserveInfo(){
      let self = this
      this.$axios.get(
        '/records/queryreserve', 
        {params: {page: self.rsvCurrentPage}}
      ).then(res=>{
        console.log(res)
        this.rsvTotal = res.data.count
        this.rsvRecords = res.data.results
      }).catch(err=>{
        this.$message.error('查询失败，请重试')
        console.log(err)
      })
    },
    queryUsageInfo(){
      let self = this
      this.$axios.get(
        '/records/queryuse', 
        {params: {page: self.usgCurrentPage}}
      ).then(res=>{
        console.log(res)
        this.usgTotal = res.data.count
        this.usgRecords = res.data.results
      }).catch(err=>{
        this.$message.error('查询失败，请重试')
        console.log(err)
      })
    },    
    queryBrcInfo(){
      let self = this
      this.$axios.get(
        '/records/querybreach', 
        {params: {page: self.brcCurrentPage}}
      ).then(res=>{
        console.log(res)
        this.brcTotal = res.data.count
        this.brcRecords = res.data.results
      }).catch(err=>{
        this.$message.error('查询失败，请重试')
        console.log(err)
      })
    },
    removeRsv(id){
      this.$confirm('是否确定取消该次预约?','提示',{
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(()=>{
        console.log(id)
      }).catch(()=>{})
    }
  }
}
</script>

<style scoped>
</style>

