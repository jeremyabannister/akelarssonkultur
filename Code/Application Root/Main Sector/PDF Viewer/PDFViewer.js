class PDFViewer extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.pdfDocument = null
		this.requiredHeight = 0
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			topBufferForPageViews: 30,
			betweenBufferForPageViews: 8,
		}
		
		// UI
		this.pageViews = []
		for (var i = 0; i < 10; i++) {
			this.pageViews.push(new JABView())
		}
		
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
		this.addPageViews()
	}
	
	addPageViews () {
		for (var i = 0; i < this.pageViews.length; i++) {
			this.addSubview(this.pageViews[i])
		}
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configurePageViews()
		this.positionPageViews()
	}
	
	
	
	configurePageViews () {
		for (var i = 0; i < this.pageViews.length; i++) {
			if (this.pdfDocument == null) { break }
			if (this.pdfDocument.imagePaths.length <= i) { break }
			let view = this.pageViews[i]
			view.backgroundImage = this.pdfDocument.imagePaths[i]
		}
	}
	
	positionPageViews () {
		for (var i = 0; i < this.pageViews.length; i++) {
			let view = this.pageViews[i]
			let newFrame = new CGRect()
			if (this.pdfDocument == null) {
				view.frame = newFrame
				continue
			}
			if (this.pdfDocument.imagePaths.length <= i) {
				view.frame = newFrame
				continue
			}
								
			newFrame.size.width = applicationRoot.contentWidth * {'xxs': 1, 'xs': 1, 's': 0.6, 'm': 0.6, 'l': 0.6, 'xl': 0.6}[sizeClass]
			newFrame.size.height = newFrame.size.width * (11.0/8.5)

			newFrame.origin.x = (this.width - newFrame.size.width)/2
			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForPageViews + (i * (newFrame.size.height + this.parameters.betweenBufferForPageViews))
								
			view.frame = newFrame
			
			if (i == this.pdfDocument.imagePaths.length - 1) {
				this.requiredHeight = view.bottom
			}
		}
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
	viewBackgroundImageDidLoad (view) {
		
	}
	
}