/**
 * Created by BlackStar
 * @brief dragonbones 使用封装类
 *  需要配合dragonBonesConfig一起使用
 */
class GTDragonBonesManager {
    private static m_pThis:GTDragonBonesManager = null;
	private m_cout:number ;

	private m_loadGroupTarget: any = null ; 
	private m_loadGroupFunc: Function = null ; 

	public constructor() {
		this.m_cout = 1;
        this.registerAdvanceTime();
	}

	public static GetInstance():GTDragonBonesManager {
		if (GTDragonBonesManager.m_pThis == null) {
			GTDragonBonesManager.m_pThis = new GTDragonBonesManager();
		}
		return GTDragonBonesManager.m_pThis;
	}

    /* 如果需要增加创建出来的armature的事件，那么返回的armature里进行操作 */
    //http://developer.egret.com/cn/github/egret-docs/DB/dbLibs/events/index.html
    // armamture 的显示相关都操作 armature下的display
	public createDragoneBonesAramture(dbIndex: DragonbonesEnum, armatureName: string = GTDragonBonesConfig.STR_ARMATURE_DEFAULT_NAME, eventObj: any = null , frameCallBackFunc: Function = null , completeCallBackFunc: Function = null , loopCompleteCallBack: Function = null ) :dragonBones.Armature {
		// this.m_cout += 1;
		// egret.log("~~~~~~   createDragoneBonesAramture~~" + this.m_cout);

		//init dragonbones 
        // egret.log(dragonBones.DragonBonesData);

        let dbTextureInfo: DragonbonesTextureData = GTDragonBonesConfig.DbTextureInfoArray[dbIndex] ; 

        let dragonebonesData = RES.getRes(dbTextureInfo.db_json);
        let textureData = RES.getRes(dbTextureInfo.db_texture_json); 
        let texture = RES.getRes(dbTextureInfo.db_texture_png);

        let dragonbonesFactory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonebonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture , textureData));

        // let armature:dragonBones.Armature = dragonbonesFactory.buildArmature(armatureName);
		
		//急速模式
		var armature:dragonBones.FastArmature = dragonbonesFactory.buildFastArmature(armatureName); //构建FastArmature
		armature.enableAnimationCache(30); 


        if (frameCallBackFunc != null && eventObj) {
            //dragonBones.FrameEvent   , evt.frameLabel
			armature.addEventListener(dragonBones.AnimationEvent.ANIMATION_FRAME_EVENT, frameCallBackFunc , eventObj );  
			armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				armature.removeEventListener(dragonBones.AnimationEvent.ANIMATION_FRAME_EVENT, frameCallBackFunc, eventObj);
				GTDragonBonesManager.GetInstance().RemoveArmInWorldClock(armature );
			} ,this);
		}

		if (completeCallBackFunc != null && eventObj) {
			armature.addEventListener(dragonBones.AnimationEvent.COMPLETE , completeCallBackFunc , eventObj );
			armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE , completeCallBackFunc, eventObj);
			} ,this);
		}

		if (loopCompleteCallBack != null && eventObj) {
			armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE , loopCompleteCallBack , eventObj );
			armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, loopCompleteCallBack, eventObj);
			} ,this);
		}

		armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				GTDragonBonesManager.GetInstance().RemoveArmInWorldClock(armature );
			} ,this);


		return armature;
	}

	//需要的先替换成封装的了，如果其他需要再换吧[BlackStar]
	public Play(armClip: dragonBones.Armature  ,animationName?: string, playTimes?: number): void {
		armClip.animation.play(animationName , playTimes );

	}

    public AddArmCallBackFunc(armature: dragonBones.Armature  , eventObj: any = null , frameCallBackFunc: Function = null , completeCallBackFunc: Function = null , loopCompleteCallBack: Function = null): void {
        if (frameCallBackFunc != null && eventObj) {
            //dragonBones.FrameEvent   , evt.frameLabel
			armature.addEventListener(dragonBones.AnimationEvent.ANIMATION_FRAME_EVENT, frameCallBackFunc , eventObj );  

			armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				armature.removeEventListener(dragonBones.AnimationEvent.ANIMATION_FRAME_EVENT, frameCallBackFunc, eventObj);
			} ,this);
		}

		if (completeCallBackFunc != null && eventObj) {
			armature.addEventListener(dragonBones.AnimationEvent.COMPLETE , completeCallBackFunc , eventObj );

			armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, completeCallBackFunc, eventObj);
			} ,this);
		}

		if (loopCompleteCallBack != null && eventObj) {
			armature.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE , loopCompleteCallBack , eventObj );

			armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, loopCompleteCallBack, eventObj);
			} ,this);
		}

		armature.display.addEventListener(egret.Event.REMOVED_FROM_STAGE ,function() {
				GTDragonBonesManager.GetInstance().RemoveArmInWorldClock(armature );
			} ,this);
    }

	public RemoveArmCallBackFunc(armature: dragonBones.Armature  , eventObj: any = null , frameCallBackFunc: Function = null , completeCallBackFunc: Function = null , loopCompleteCallBack: Function = null): void {
        if (frameCallBackFunc != null && eventObj) {
			armature.removeEventListener(dragonBones.AnimationEvent.ANIMATION_FRAME_EVENT, frameCallBackFunc, eventObj);
		}

		if (completeCallBackFunc != null && eventObj) {
			armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, completeCallBackFunc, eventObj);
		}

		if (loopCompleteCallBack != null && eventObj) {
			armature.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, loopCompleteCallBack, eventObj);
		}
	}


    //在播放时加入到计时器中
    public AddArmInWorldClock(armature:dragonBones.Armature): void 
    {
        dragonBones.WorldClock.clock.add(armature);
    }

     //播放结束从计时器中移除
    public RemoveArmInWorldClock(armature:dragonBones.Armature): void {
        dragonBones.WorldClock.clock.remove(armature);
    }
	
	public ClearArmInWorldClock(): void {
		// dragonBones.WorldClock.clock.clear();
	}

    private registerAdvanceTime(): void {
        egret.Ticker.getInstance().register( function (frameTime:number) {
        dragonBones.WorldClock.clock.advanceTime(frameTime/1000)
        } , this);
    }

    /** @brief : 换装,这里只用了最简单的一中，其他:http://developer.egret.com/cn/github/egret-docs/DB/dbLibs/replaceTexture/index.html 
     * targetObj :目标动画
     * armature: 替换的新动画
     * slotName: 目标插槽在动画中的名字 */
    public replaceSlot(targetObj: any ,armature: dragonBones.Armature , slotName: string) {
        let slot: dragonBones.Slot = armature.getSlot(slotName);
		// slot.setDisplay(targetObj);

		//注：使用mesh时Display的大小和texture大小不一样。(此处应注意锚点!!)
		if (slot.getDisplay().texture.textureWidth != targetObj.width)
		{
			slot.getDisplay().texture.textureWidth = targetObj.width;
			slot.getDisplay().anchorOffsetX = targetObj.width/2;
		}

		if (slot.getDisplay().texture.textureHeight != targetObj.height)
		{
			slot.getDisplay().texture.textureHeight = targetObj.height;
			slot.getDisplay().anchorOffsetY = targetObj.height/2;
		}
		slot.getDisplay().texture = targetObj.texture;
    }

    public changeArmSpeed(armature: dragonBones.Armature , speed: number): void {
        armature.animation.timeScale = speed;
        //or
        // armature.gotoAndPlay("walk").setTimeScale(0.5);
    }


    /** 动画遮罩与混合: http://developer.egret.com/cn/github/egret-docs/DB/dbLibs/maskAndMixed/index.html */
    public armMarskAndFadeIn(): void {

    }

    /**动画拷贝 : http://developer.egret.com/cn/github/egret-docs/DB/dbLibs/copy/index.html */
    public copyArm(): void {

    }

	public BlendArmature(armature: dragonBones.Armature): void {
		// armature.animation.fadeIn("run",0,-1,0,0,"UPPER_BODY_GROUP",dragonBones.Animation.SAME_GROUP);
	}

}