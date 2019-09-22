<template>
  <div>
    <el-tabs type="border-card" tab-position="left" :stretch="true" style="min-height: 480px">
      <el-tab-pane label="预约记录">
        <el-table :data="rsvRecords" ref="revRecords">
          <el-table-column label="记录编号"  width="120">
            <template slot-scope="scope">
              <div>{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column label="使用时间" width="360">
            <template slot-scope="scope">
              <div v-if="scope.row.AMPM === 'AM'">{{scope.row.time}}上午</div>
              <div v-if="scope.row.AMPM === 'PM'">{{scope.row.time}}下午</div>
            </template>
          </el-table-column>
          <el-table-column label="负责人名单">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="click" width="420">
                <el-table :data="scope.row.leaders">
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="id" label="证件号"></el-table-column>
                </el-table>
                <el-button slot="reference" size="small" type="primary" :plain="true">查看</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="预约状态">
            <template slot-scope="scope">
              <div v-if="scope.row.status === 'ready'" style="color:green">已预约</div>
              <div v-if="scope.row.status === 'canceled'" style="color:gray">被取消</div>
              <div v-if="scope.row.status === 'missed'" style="color:red">未赴约</div>
            </template>
          </el-table-column>         
        </el-table>
        <el-pagination 
          :total="rsvTotal" 
          :current-page="rsvCurrentPage" 
          :page-size="recordPerPage" 
          @current-change="handleRsvCurrentChange" 
          :pager-count=11 
          layout="sizes, prev, pager, next, jumper, ->, total" 
          @size-change="handlePerPageChange"
          :page-sizes=[10,20]
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="使用记录">   
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'ReservationRecord',
  data(){
    return {
      rsvRecords:[{
        id: 1001,
        time: '2019-10-20',
        AMPM: 'PM',
        status: 'ready',
        leaders: [{
          name: 'student1',
          id: 2017000001,
        },{
          name: 'student2',
          id: 2017000002
        }]
      },{
        id: 992,
        time: '2019-09-10',
        AMPM: 'AM',
        status: 'missed',
        leaders: [{
          name: 'student1',
          id: 2017000001,
        },{
          name: 'student2',
          id: 2017000002
        }]
      },{
        id: 1020,
        time: '2019-10-21',
        AMPM: 'PM',
        status: 'canceled',
        leaders: [{
          name: 'student1',
          id: 2017000001,
        },{
          name: 'student2',
          id: 2017000002
        }]
      }],
      rsvTotal: 3,
      usgRecords:[{
        id: 1001,
        time: '2019-10-20',
        AMPM: 'PM',
        status: 'normal',
        leaders: [{
          name: 'student1',
          id: 2017000001,
        },{
          name: 'student2',
          id: 2017000002
        }]
      },{
        id: 992,
        time: '2019-09-10',
        AMPM: 'AM',
        status: 'normal',
        leaders: [{
          name: 'student1',
          id: 2017000001,
        },{
          name: 'student2',
          id: 2017000002
        }]
      },{
        id: 1020,
        time: '2019-10-21',
        AMPM: 'PM',
        status: 'abnormal',
        leaders: [{
          name: 'student1',
          id: 2017000001,
        },{
          name: 'student2',
          id: 2017000002
        }]
      }
      ],
      usgTotal:3,
      rsvCurrentPage: 1,
      recordPerPage: 10,
      usgCurrentPage: 1,
    }
  },
  methods: {
    handleRsvCurrentChange(val){
      this.rsvCurrentPage = val
    },
    handleUsgCurrentChange(val){
      this.usgCurrentPage = val
    },
    handlePerPageChange(val){
      console.log(val)
      this.recordPerPage = val
    }
  }
}
</script>

<style scoped>
</style>

