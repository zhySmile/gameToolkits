class TestCtrRadarChartLayer extends eui.Component implements  eui.UIComponent {
public group_basic:eui.Group;
public btn_close:eui.Button;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();

		this.init();

		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_END, this.handleTouch, this);
	}

	private init(): void {
		let dataArray: Array<CtrRadarChartPropertyData> = [] ; 
		let data1:CtrRadarChartPropertyData = { name: "胸", currentValue: 90 , compairedValue: 70, maxValue: 100 , nameColor: 0xeeffcc , valueColor: 0xeeff00 ,labelSize: 30};
		let data2 = { name: "屁股", currentValue: 80 , compairedValue: 60, maxValue: 100 , nameColor: 0xeecccc , valueColor: 0xeeff00 ,labelSize: 30};
		let data3 = { name: "腰", currentValue: 60 , compairedValue: 30, maxValue: 100 , nameColor: 0xeebbcc , valueColor: 0xeeff00 ,labelSize: 30};
		let data4 = { name: "腿", currentValue: 20 , compairedValue: 80, maxValue: 100 , nameColor: 0xeeaacc , valueColor: 0xeeff00 ,labelSize: 30};
		let data5 = { name: "手", currentValue: 40 , compairedValue: 10, maxValue: 100 , nameColor: 0xaaffcc , valueColor: 0xeeff00 ,labelSize: 30};
		// let data6 = { name: "脸", currentValue: 50 , compairedValue: 50, maxValue: 100 , nameColor: 0xbbffcc , valueColor: 0xeeff00 ,labelSize: 30};
		dataArray.push(data1);
		dataArray.push(data2);
		dataArray.push(data3);
		dataArray.push(data4);
		dataArray.push(data5);
		// dataArray.push(data6);
		let ctrRadarChart: CtrRadarChart = new CtrRadarChart(dataArray );
		ctrRadarChart.x = 300 ; 
		ctrRadarChart.y = 500 ;
		this.addChild(ctrRadarChart);

		let drawBgLineInfo: CtrRadarChartDrawShapeInfo = { radius: 4 ,color: 0x00fff0,alpha: 1} ;
		let drawPropertyInfo1: CtrRadarChartDrawPropertyInfo = { lineRadius: 4 ,lineColor: 0xff00ff,lineAlpha: 1, bgColor: 0xff0000, bgAlpha: 0.5 };
		let drawPropertyInfo2: CtrRadarChartDrawPropertyInfo = { lineRadius: 4 ,lineColor: 0x0000ff,lineAlpha: 1, bgColor: 0x0000cc, bgAlpha: 0.5 };
		let drawPropertyLineInfo: CtrRadarChartDrawShapeInfo = { radius: 10 ,color: 0xffff00,alpha: 1} ;
		let drawPropertyPointInfo1: CtrRadarChartDrawShapeInfo = { radius: 10 ,color: 0x880000,alpha: 1} ;
		let drawPropertyPointInfo2: CtrRadarChartDrawShapeInfo = { radius: 10 ,color: 0x000088,alpha: 1} ;

		ctrRadarChart.SetShowPropertyPointType(EnumCtrRadarShowProPointType.noPoint);
		// ctrRadarChart.SetShowPropertyPointType(EnumCtrRadarShowProPointType.imgPoint, "img_radar_point_png" );
		// ctrRadarChart.SetShowPropertyPointType(EnumCtrRadarShowProPointType.verctorPoint, "" , drawPropertyPointInfo1);
		// ctrRadarChart.SetShowPropertyPointType(EnumCtrRadarShowProPointType.verctorPoint, "" , drawPropertyPointInfo1, drawPropertyPointInfo2 );


		// ctrRadarChart.SetShowBgLineType(EnumCtrRadarShowLineType.bgImg , "img_radar_bg_png" );
		// ctrRadarChart.SetShowBgLineType(EnumCtrRadarShowLineType.imgLine , "" , "img_radar_line_png");
		ctrRadarChart.SetShowBgLineType(EnumCtrRadarShowLineType.vectorLine , "" , "" , drawBgLineInfo);
		

		// ctrRadarChart.SetShowPropertyType(EnumCtrRadarShowProType.self , drawPropertyInfo1 );
		// ctrRadarChart.SetShowPropertyType(EnumCtrRadarShowProType.comparison , drawPropertyInfo1 ,drawPropertyInfo2);
		ctrRadarChart.SetShowPropertyType(EnumCtrRadarShowProType.comparison );

		// ctrRadarChart.SetShowValueType(EnumCtrRadarShowValueType.showNone);
		// ctrRadarChart.SetShowValueType(EnumCtrRadarShowValueType.showAll);
		// ctrRadarChart.SetShowValueType(EnumCtrRadarShowValueType.showOnlyValue);
		ctrRadarChart.SetShowValueType(EnumCtrRadarShowValueType.showPercent);



		ctrRadarChart.DrawNow();
	}

	public handleTouch(event:egret.Event):void
	{ 
		this.parent.removeChild(this);
		GameMainscene.GetInstatnce().SetTestLayerVisible(true);
	}
	
}