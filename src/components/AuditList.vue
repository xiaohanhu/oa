<template>
    <Table stripe :columns="columns" :data="auditList"></Table>
</template>
<script>
    export default {
       data () {
            return {
            	auditList: [],
                model1: '',
                columns: [
                	{
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '操作人',
                        key: 'operatorId'
                    },
                    {
                        title: '同意1不同意0',
                        key: 'pass'
                    },
                    {
                        title: '意见',
                        key: 'opinion'
                    }
                ]
            }
        },
        mounted(){
	      this.getAuditList();
	    },
        methods: {
	      	//获取任务列表
	      	getAuditList(){
		        let vm = this;
		        this.$http.post('http://localhost:8888/audit/list', {
		        
		        }).catch(function(error){
		          alert('错误提示，网络错误，请刷新重试！')
		        }).then(function (res) {
		          if (res.data.retCode == 1) {
		            vm.auditList = res.data.result.list;
		          }
		        })
	        }
   		}
    }
</script>
