<template>
	<Table stripe :columns="columns" :data="toDraftList"></Table>
	<!--<Page :total="100" show-total></Page>-->
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
											this.$router.push('/toDraftEdit/' + params.row.id);
                                        }
                                    }
                                }, '修改'),
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
                                }, '删除')
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
		          if (res.data.status == '000000') {
		            vm.toDraftList = res.data.data.list;
		          }
		        })
	        },
	      	// 修改
	      	deit (id) {
                
            },
            // 删除
            remove (id) {
                let vm = this;
		        this.$http.delete('http://localhost:8888/toDraft/'+ id, {
		        
		        }).catch(function(error){
		          alert('错误提示，网络错误，请刷新重试！')
		        }).then(function (res) {
		          if (res.data.status == '000000') {
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