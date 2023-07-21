class StoryControl{
	
	static autoSave(){
		$gameSystem.onBeforeSave();
		DataManager.saveGame(1);
	}
	
	static autoLoad(){
		DataManager.loadGame(1);
	}
	
	static loadStoryInfo(){
		
		var tempGlobalInfo = DataManager.loadGlobalInfo()||[];
		
		try{
			$globalData = tempGlobalInfo[1].storyInfo;
		}catch(error){
			this.autoSave();
			$globalData = this.loadStoryInfo()
		}
		
		return $globalData;
		
	}
	
}

nw.Window.get().on('close', function(){
		StoryControl.autoSave();
		this.hide();
		this.close(true);
	});
	
Scene_Title.prototype.start = function(){
	
	StoryControl.loadStoryInfo();
	
	StoryControl.autoLoad();
	
	SceneManager.goto(Scene_Map);
	
}