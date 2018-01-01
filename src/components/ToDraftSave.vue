<template>
	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文件类型" prop="typeNumber">
            <Select v-model="formValidate.typeNumber" placeholder="请选择文件类型">
                <Option v-for="item in fileTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="内容" prop="content">
            <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>

<script>
	export default {
		data () {
            return {
            	fileTypeList: [],
                formValidate: {
                	typeNumber: '',
                    title: '',
                    content: ''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '文章标题不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入文件内容', trigger: 'blur' },
                        { type: 'string', min: 20, message: '不能少于20个字', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
	      this.getFileTypeList();
	    },
        methods: {
        	handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	this.auditSave();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
	      	//获取任务列表
	      	getFileTypeList(){
		        let vm = this;
		        this.$http.post('http://localhost:8888/fileType/list', {
		        
		        }).catch(function(error){
		          alert('错误提示，网络错误，请刷新重试！')
		        }).then(function (res) {
		          if (res.data.retCode == 1) {
		            vm.fileTypeList = res.data.result.list;
		          }
		        })
	        },
	        //获取任务列表
	      	auditSave(){
		        let vm = this;
		        this.$http.post('http://localhost:8888/toDraft/save', {
		        	title:vm.formValidate.title,
		        	content:vm.formValidate.content,
		        	typeNumber:vm.formValidate.typeNumber
		        }).catch(function(error){
		          alert('错误提示，网络错误，请刷新重试！')
		        }).then(function (res) {
		          if (res.data.status == '000000') {
		          	vm.$Message.success('Success!');
		            console.log("success -------")
		            vm.$router.push('/toDraftList');
		          }
		        })
	        }
	    }
    }
</script>

<style>
</style>