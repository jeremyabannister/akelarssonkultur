class ProjectRegion extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.imagePath = ''
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			
			minimumDistanceFromImageViewToLogo: 15,	
			imageAspectRatio: (2448.0/3264.0),
			
			topBufferForCaptionLabel: 20,
		}
		
		// UI
		this.imageView = new JABView('ImageView')
		this.captionLabel = new UILabel('CaptionLabel')
		
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
		
		this.addImageView()
		this.addCaptionLabel()
		
	}
	
	
	addImageView () {
		this.addSubview(this.imageView)
	}
	
	addCaptionLabel () {
		this.addSubview(this.captionLabel)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configureImageView()
		this.positionImageView()
		
		this.configureCaptionLabel()
		this.positionCaptionLabel()
	}
	
	
	
	
	// Image View
	configureImageView () {
		let view = this.imageView
		view.clickable = true
		
		
		view.backgroundImage = this.imagePath
		view.backgroundSize = 'contain'
		
	}
	
	positionImageView () {
		let view = this.imageView
		let newFrame = new CGRect()
							
		newFrame.size.width = applicationRoot.contentWidth * 0.7
		newFrame.size.height = newFrame.size.width * this.parameters.imageAspectRatio
		
		// Now calculated the unused height or width of imageView and eliminate it. This will not alter the size of the image, only the fact that without this there is an invisible region around the image which intercepts a click but does not react.
		if (view.backgroundImageLoaded && view.backgroundImageObject.width != 0 && this.parameters.imageAspectRatio != 0) {
			let actualAspectRatio = view.backgroundImageObject.height/view.backgroundImageObject.width
			if (actualAspectRatio > this.parameters.imageAspectRatio) {
				newFrame.size.width -= ((newFrame.size.height/this.parameters.imageAspectRatio) - (newFrame.size.height/actualAspectRatio))
			} else {
				newFrame.size.height -= (newFrame.size.width * (this.parameters.imageAspectRatio - actualAspectRatio))
			}
		}
		
		

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.parameters.reservedTopBuffer + ((this.height - this.parameters.reservedTopBuffer) - newFrame.size.height)/2
		
		if (newFrame.origin.y < (this.parameters.reservedTopBuffer + this.parameters.minimumDistanceFromImageViewToLogo)) {
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.minimumDistanceFromImageViewToLogo
		}
							
		view.frame = newFrame
	}
	
	
	
	
	// Caption Label
	configureCaptionLabel () {
		let view = this.captionLabel
		view.clickable = true
		
		view.text = ""
		
		view.textColor = 'black'
		view.fontSize = 14
		view.fontFamily = 'siteFont'
		view.fontWeight = 'normal'
		view.lineHeight = 1.7
		
		
	}
	
	positionCaptionLabel () {
		let view = this.captionLabel
		let newFrame = new CGRect()
		
		newFrame.size.width = applicationRoot.contentWidth * 0.7
		let size = view.font.sizeOfString(view.text, newFrame.size.width)
		
		newFrame.size.height = size.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = this.imageView.bottom + this.parameters.topBufferForCaptionLabel
							
		view.frame = newFrame
	}
	
	
	
	
	
	//
	// Event Listeners
	//
	
	
	//
	// Actions
	//
	
	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		this.parent.projectRegionUIInterceptedClick(self)
	}
	
	viewBackgroundImageDidLoad (view) {
		this.imageView.positionDuration = 0
		this.positionImageView()
		this.imageView.positionDuration = null
	}
	
}