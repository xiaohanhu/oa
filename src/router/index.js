import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import ToDraftList from '@/components/ToDraftList'
import ToDraftSave from '@/components/ToDraftSave'
import ToDraftEdit from '@/components/ToDraftEdit'

import AuditList from '@/components/AuditList'
import Layout from '@/components/Layout'
import Table from '@/components/Table'
import Forms from '@/components/Forms'
import AuditSave from '@/components/AuditSave'


Vue.use(Router)

export default new Router({
	mode:'history',
  	routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
       children:[
        {
	      path: '/toDraftList',
	      name: 'ToDraftList',
	      component: ToDraftList
	    },
	    {
	      path: '/toDraftSave',
	      name: 'ToDraftSave',
	      component: ToDraftSave
	    },
	    {
	      path: '/toDraftEdit/:id',
	      name: 'ToDraftEdit',
	      component: ToDraftEdit
	    },
	  	{
	  		path: "/auditList",
	  		name: 'AuditList',
	  	    component: AuditList
	  	},
	  ]
    },
    {
      path: '/auditSave',
      name: 'AuditSave',
      component: AuditSave
    },
    {
      path: '/forms',
      name: 'Forms',
      component: Forms
    },
    {
		path: "/table",
		name: 'Table',
	    component: Table
	},
  ]
})
