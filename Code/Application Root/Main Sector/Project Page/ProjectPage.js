class ProjectPage extends JABView {
	
	constructor (customId, projectDataBundles) {
		super(customId)
		
		// State
		this.state = {
			shouldStartLoading: false,
			
			projectDataBundles: projectDataBundles,
			projectIndex: null,
			imageIndex: null,
			
		}
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			minimumDistanceFromImageViewToLogo: 15,
			
			projectRegionAspectRatio: (2448.0/3264.0),
			
			sizeOfArrowButtons: 60,
			insetForArrowButtons: 20,
			innerBufferForArrowButtons: 20, // Distance from arrow to image
			
		}
		
		// UI
		this.projectRegion = new ProjectRegion('ProjectRegion')
		this.prevButton = new JABEmbeddedImageView('PrevButton')
		this.nextButton = new JABEmbeddedImageView('NextButton')
		
	}
	
	
	//
	// Init
	//
	
	init () {
		super.init()
	}
	
	
	
	//
	// UI
	//
	
	
	// Add
	addAllUI () {
		
		this.addProjectRegion()
		
		this.addPrevButton()
		this.addNextButton()
		
	}
	
	
	
	addProjectRegion () {
		this.addSubview(this.projectRegion)
	}
	
	addPrevButton () {
		this.addSubview(this.prevButton)
	}
	
	addNextButton () {
		this.addSubview(this.nextButton)
	}
	
	
	
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		
		this.updateParameters()
		
		
		
		this.configureProjectRegion()
		this.positionProjectRegion()
		
		this.configurePrevButton()
		this.positionPrevButton()
		
		this.configureNextButton()
		this.positionNextButton()
		
	}
	
	
	
	
	// Parameters
	updateParameters () {
		if (sizeClass == 'xs' || sizeClass == 'xxs') {
			this.parameters.sizeOfArrowButtons = 40
		} else {
			this.parameters.sizeOfArrowButtons = 60
		}
	}
	
	
	
	
	
	
	// Project Region
	configureProjectRegion () {
		let view = this.projectRegion
		view.parameters = {reservedTopBuffer: this.parameters.reservedTopBuffer}
		
		// Safely retrieve correct image path from projectDataBundles and assign it to the image view
		if (this.state.projectIndex != null) {
			if (this.state.projectDataBundles.length > this.state.projectIndex) {
				var projectDataBundle = this.state.projectDataBundles[this.state.projectIndex]
				if (this.state.imageIndex != null) {
					if (projectDataBundle.imagePaths.length > this.state.imageIndex) {
						
						view.imagePath = projectDataBundle.imagePaths[this.state.imageIndex]
					}
				}
			}
		}
		
		view.updateAllUI()
	}
	
	positionProjectRegion () {
		let view = this.projectRegion
		let newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	
	
	
	// Prev Button
	configurePrevButton () {
		var view = this.prevButton
		
		view.src = resourcesDirectory + '/Images/Project Page/Buttons/Left Arrow.png'
		
		if (this.state.projectIndex != null) {
			if (this.state.imageIndex == 0) {
				view.clickable = false
				view.opacity = 0
				view.cursor = ''
			} else {
				view.clickable = true
				view.opacity = 1
				view.cursor = 'pointer'
			}
		} else {
			view.clickable = false
			view.opacity = 0
		}
		
	}
	
	positionPrevButton () {
		var view = this.prevButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfArrowButtons + this.parameters.insetForArrowButtons
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.projectRegion.imageView.left - newFrame.size.width - this.parameters.innerBufferForArrowButtons
		newFrame.origin.y = this.projectRegion.imageView.top + (this.projectRegion.imageView.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	
	// Next Button
	configureNextButton () {
		var view = this.nextButton
		
		view.src = resourcesDirectory + '/Images/Project Page/Buttons/Right Arrow.png'
		view.clickable = true
		view.cursor = 'pointer'
		
		if (this.state.projectIndex != null) {
			if (this.state.projectDataBundles.length > this.state.projectIndex) {
				var projectDataBundle = this.state.projectDataBundles[this.state.projectIndex]
				if (this.state.imageIndex == projectDataBundle.imagePaths.length - 1) {
					view.clickable = false
					view.opacity = 0
					view.cursor = ''
				} else {
					view.clickable = true
					view.opacity = 1
					view.cursor = 'pointer'
				}
			}
		} else {
			view.clickable = false
			view.opacity = 0
		}
		
	}
	
	positionNextButton () {
		var view = this.nextButton
		var newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfArrowButtons + this.parameters.insetForArrowButtons
		newFrame.size.height = newFrame.size.width

		newFrame.origin.x = this.projectRegion.imageView.right + this.parameters.innerBufferForArrowButtons
		newFrame.origin.y = this.projectRegion.imageView.top + (this.projectRegion.imageView.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	
	
	
	
	
		
	//
	// Event Listeners
	//

	
	//
	// Actions
	//
	
	// Navigation
	goToPreviousImage () {
		if (this.state.imageIndex != 0) {
			this.state.imageIndex -= 1
		}
		
		this.updateAllUI()
	}
	
	goToNextImage () {
		if (this.state.projectIndex != null) {
			if (this.state.projectDataBundles.length > this.state.projectIndex) {
				var projectDataBundle = this.state.projectDataBundles[this.state.projectIndex]
				if (this.state.imageIndex != projectDataBundle.imagePaths.length - 1) {
					this.state.imageIndex += 1
				}
			}
		}
		
		this.updateAllUI()
	}
	
	// Load
	loadProjectDataBundle (projectDataBundle) {
		for (var i = 0; i < this.state.projectDataBundles.length; i++) {
			if (this.state.projectDataBundles[i] == projectDataBundle) {
				this.state = {
					projectIndex: i,
					imageIndex: 0,
				}
			}
		}
		
		this.updateAllUI()
	}
	
	
	
	// Swipe
	leftSwipeDetected () {
		this.goToNextImage()
	}
	
	rightSwipeDetected () {
		this.goToPreviousImage()
	}
	
	
	// Keys
	leftArrowWasPressed () {
		this.goToPreviousImage()
	}
	
	rightArrowWasPressed () {
		this.goToNextImage()
	}
	
	
	//
	// Delegate
	//
	
	// Project Region
	projectRegionUIInterceptedClick () {
		this.state = {handlingClick: true}
	}
	
	// JABView
	viewWasClicked (view) {
		if (view == this.imageView) {
			this.state = {
				handlingClick: true,
			}
		} else if (view == this.prevButton) {
			this.state.handlingClick = true
			this.goToPreviousImage()
		} else if (view == this.nextButton) {
			this.state.handlingClick = true
			this.goToNextImage()
		}
	}
	
	viewBackgroundImageDidLoad (view) {
		this.imageView.positionDuration = 0
		this.positionImageView()
		this.imageView.positionDuration = null
	}
	
	
	// Image View
	imageViewDidFinishLoadingImage (imageView) {
		
	}
	
	
	
}