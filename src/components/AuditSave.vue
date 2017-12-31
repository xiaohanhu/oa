<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">OA</div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '480px', background: '#fff'}">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
					        <FormItem label="文件类型" prop="typeNumber">
					            <Select v-model="formValidate.typeNumber" placeholder="请选择文件类型">
					                <Option v-for="item in fileTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
					            	<Option value="1">New York</Option>
					                <Option value="2">London</Option>
					                <Option value="3">Sydney</Option>
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
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
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
//                  typeNumber: [
//                      { required: true, message: '请选择文件类型', trigger: 'change' }
//                  ],
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
                    	console.log(this.formValidate.typeNumber)
                    	this.auditSave();
                        this.$Message.success('Success!');
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
		          if (res.data.retCode == 1) {
		            console.log("success -------")
		          }
		        })
	        }
	    }
    }
</script>
	