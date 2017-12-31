<template>
	<Table stripe :columns="columns" :data="toDraftList"></Table>
</template>

<script>
	export default {
       data () {
            return {
            	toDraftList: [],
                model1: '',
                columns: [
                	{
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '公文标题',
                        key: 'title'
                    },
                    {
                        title: '公文内容',
                        key: 'content'
                    },
                    {
                        title: '公文号',
                        key: 'draftNumber'
                    },
                    {
                        title: '起草人',
                        key: 'operatorId'
                    },
                    {
                        title: '文件类型',
                        key: 'draftNumber'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '修改时间',
                        key: 'updateTime'
                    },
                    {
                        title: '删除时间',
                        key: 'deleteTime'
                    },
                    {
                        title: '发布时间',
                        key: 'sendTime'
                    },
                    {
                        title: '操作',
                        key: 'do',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ]
            }
        },
        mounted(){
	      this.getDraftList();
	    },
        methods: {
	      	// 获取发文列表
	      	getDraftList(){
		        let vm = this;
		        this.$http.post('http://localhost:8888/toDraft/list', {
		        
		        }).catch(function(error){
		          alert('错误提示，网络错误，请刷新重试！')
		        }).then(function (res) {
		          if (res.data.retCode == 1) {
		            vm.toDraftList = res.data.result.list;
		          }
		        })
	        },
	      	//显示和删除
	      	show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Id)：${this.toDraftList[index].id}<br>Title：${this.data6[index].title}<br>DraftNumber：${this.data6[index].draftNumber}`
                })
            },
            // 删除
            remove (id) {
                let vm = this;
		        this.$http.delete('http://localhost:8888/toDraft/'+ id, {
		        
		        }).catch(function(error){
		          alert('错误提示，网络错误，请刷新重试！')
		        }).then(function (res) {
		          if (res.data.retCode == 1) {
		            vm.getDraftList();
					vm.$Message.error('删除成功!');
		          } else {
		          	vm.$Message.error('删除失败!');
		          }
		        })
            }
   		}
    }
</script>

<style>
</style>