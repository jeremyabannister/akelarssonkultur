class ProjectsPage extends JABView {

	constructor (customId, projectDataBundles) {
		super(customId)
		
		
		// State
		this.state = {
			shouldStartLoading: false,
			
			projectDataBundles: projectDataBundles,
			
			selectedImageViewer: null,
		}
		
		this.imageCaptions = ['', 'I Thoreaus stuga vid Walden Pond. Concord Massachsetts', 'Babylon p' + lowerCaseARing + ' Palladium i Malm' + lowerCaseODots, 'Med Ali Sabah  p' + lowerCaseARing + ' Hyllie park folkh' + lowerCaseODots + 'gskola', 'Efter en f' + lowerCaseODots + 'rel' + lowerCaseADots + 'sning f' + lowerCaseODots + 'r Crossing Borders p' + lowerCaseARing + ' Krogerup h' + lowerCaseOSlash + 'jskole. Humleb' + lowerCaseAE + 'k, Danmark.', 'Med Oudmakaren Faruk Turunz i Istanbul', 'Under f' + lowerCaseODots + 'rest' + lowerCaseADots + 'llningen "The Marginal Man". Runmar' + lowerCaseODots + ' hembygdsg' + lowerCaseARing + 'rd', 'Presentation av projektet "One Sweden" p' + lowerCaseARing + ' bokm' + lowerCaseADots + 'ssan i  G' + lowerCaseODots + 'teborg', 'F' + lowerCaseODots + 'rel' + lowerCaseADots + 'sning p' + lowerCaseARing + ' en kurs arrangerad av Teologiska h' + lowerCaseODots + 'gskolan i Stockholm - "Framv' + lowerCaseADots + 'xten av det moderna Sverige"', 'Med Ali Sabah och oudmakaren Ibrahim Ada, Istanbul', 'M' + lowerCaseODots + 'te p' + lowerCaseARing + ' Anna Lind Foundation, Alexandria', 'Workshop, Mbale/Uganda']

		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
			
			imageAspectRatio: (2448.0/3264.0),
			
			numberOfColumns: 2,
			topBufferForGrid: 15,
			betweenBufferForGridRows: 10,
			betweenBufferForGridColumns: 10,
			bottomBufferForGrid: 50,
			
			heightOfScrollBuffer: 100,
		}
		
		
		// Timers
		this.scrollFinishTimer
		
		
		
		// UI
		this.scrollBuffer = new JABView('ScrollBuffer')
		
		
		this.imageViews = []
		for (var i = 0; i < projectDataBundles.length; i++) {
			this.imageViews.push(new HoverableTextOverlay('ImageView' + (i + 1)))
		}
		
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
		this.startEventListeners()
		
	}
	
	
	//
	// Getters and Setters
	//
	
	requiredHeightForWidth (width) {
		console.log(this.imageViews.count)
		if (this.imageViews.count > 0) {
			return this.imageViews[this.imageViews.count - 1].bottom + this.parameters.bottomBufferForGrid
		}
		return 100
	}
	
	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addScrollBuffer()
		
		this.addImageViews()
		
	}
	
	
	addScrollBuffer () {
		this.addSubview(this.scrollBuffer)
	}
	
	
	
	addImageViews () {
		for (var i = 0; i < this.imageViews.length; i++) {
			this.addSubview(this.imageViews[i])
		}
	}
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		this.updateParameters()
		
		
		this.configureScrollBuffer()
		this.positionScrollBuffer()
		
		
		this.configureImageViews()
		this.positionImageViews()
	}
	
	
	
	// Parameters
	updateParameters () {
		
	}
	
	
	
	// Scroll Buffer
	configureScrollBuffer () {
		var view = this.scrollBuffer
		
		view.backgroundColor = this.backgroundColor
	}
	
	positionScrollBuffer () {
		var view = this.scrollBuffer
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height + 50

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	
	// Image Views
	configureImageViews () {
		for (var i = 0; i < this.imageViews.length; i++) {
			var view = this.imageViews[i]
			
			if (this.state.projectDataBundles.length > i) {
				var projectDataBundle = this.state.projectDataBundles[i]
				if (projectDataBundle.imagePaths.length > 0) {
					view.backgroundImage = projectDataBundle.imagePaths[0]
				}
				
				view.text = this.imageCaptions[i]
				view.clickable = true
				view.cursor = 'pointer'
				
				
				view.updateAllUI()
			}
		}
	}
	
	positionImageViews () {
		for (var i = 0; i < this.imageViews.length; i++) {
			var view = this.imageViews[i]
			var newFrame = new CGRect()
			
			newFrame.size.width = (applicationRoot.contentWidth - ((this.parameters.numberOfColumns - 1) * this.parameters.betweenBufferForGridColumns))/this.parameters.numberOfColumns
			newFrame.size.height = newFrame.size.width * this.parameters.imageAspectRatio

			newFrame.origin.x = (this.width - applicationRoot.contentWidth)/2 + (i % this.parameters.numberOfColumns) * (newFrame.size.width + this.parameters.betweenBufferForGridColumns)
			newFrame.origin.y = this.parameters.heightOfHeader + this.parameters.topBufferForGrid + Math.floor(i/this.parameters.numberOfColumns) * (newFrame.size.height + this.parameters.betweenBufferForGridRows)
			
			view.frame = newFrame
		}
	}

	
	
	
	
	
	
	
	//
	// Event Listeners
	//

	startEventListeners () {
		// var projectsPage = this
		
		// $(this.selector).bind('mousewheel', function(evt) {
			
		// 	if (!projectsPage.state.scrollable) {
		// 		evt.preventDefault()
		// 	} else {
		// 		projectsPage.configureProjectPanes()
		// 	}
			
		// 	clearTimeout(projectsPage.scrollFinishTimer)
		// 	if (projectsPage.scrollTop <= 0) {
		// 		projectsPage.scrollFinishTimer = setTimeout(function () {
		// 			// projectsPage.state.readyToClose = true // Uncomment this line make website closable from projects page
		// 		}, 50)
		// 	} else {
		// 		projectsPage.state.readyToClose = false
		// 	}
			
		// 	if (projectsPage.state.readyToClose && evt.originalEvent.wheelDelta > 0) {
		// 		evt.preventDefault()
		// 	}
			
		// })
	}




	//
	// Actions
	//
	
	
	
	
	
	
	// Keys
	spaceBarWasPressed () {
		
	}
	
	
	leftArrowWasPressed () {
		
	}
	
	upArrowWasPressed () {
		
	}
	
	rightArrowWasPressed () {
		
	}
	
	downArrowWasPressed () {
		
	}
	
	
	
	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		for (var i = 0; i < this.imageViews.length; i++) {
			if (this.imageViews[i] == view) {
				if (this.state.projectDataBundles.length > i) {
					this.parent.projectsPageWantsToOpenProject(this, this.state.projectDataBundles[i])
				}
			}
		}
	}
	
	viewWasHovered (view) {
		
	}
	
	viewWasUnhovered (view) {
		
	}
	
	viewBackgroundImageDidLoad (view) {
		
	}
	
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
	
	
}
