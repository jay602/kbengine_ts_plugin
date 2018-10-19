//    Copyright (C) 2016-2017 __COMPANY_NAME
//    All rights reserved
//
//    created by zone at 2017/9/26 22:54

import {KBEngineApp,KBEngineArgs} from "./kbengine/KBEngine";
import KBEEvent from "./kbengine/Event";

const {ccclass, property, disallowMultiple,executionOrder} = cc._decorator

export var g_ServerNode:ServerNode=null
@ccclass
@disallowMultiple
export default class ServerNode extends cc.Component {
    onLoad(){
        g_ServerNode=this
        if(CC_DEBUG)window["g_ServerNode"]=g_ServerNode

        this.initServerApp()
    }

    installEvents(){
        //example
        KBEEvent.Register("onCreateAccountResult",this,this.onCreateAccountResult.bind(this))
    }

    initServerApp():void {
        cc.log("init Server App")
        let args = new KBEngineArgs();
        args.address='127.0.0.1'
        args.port = 20013;

        args.clientType=5
        KBEngineApp.app.Destroy();
        KBEngineApp.Create(args)
    }

    onButtonRegister(){
        let account="test123"
        let pass="test123"
        KBEngineApp.app.CreateAccount(account,pass,"")
    }

    onButtonLogin(){
        let account="test123"
        let pass="test123"
        KBEngineApp.app.Login(account,pass,"")
    }

    onCreateAccountResult(err, datas) {
        cc.log("onCreateAccountResult",err,datas)
    }

    onDestroy(){
        if(g_ServerNode==this){
            g_ServerNode=null
            if(CC_DEBUG)window["g_ServerNode"]=null
        }
    }
}