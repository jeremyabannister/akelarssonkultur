class CVPage extends JABView {
	
	constructor (customId) {
		super(customId)
		
		// State
		this.pdfDocument = null
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			
			sizeOfImageView: 200,
			topBufferForImageView: 60
		}
		
		// UI
		this.pdfViewer = new PDFViewer('PDFViewer')
		this.imageView = new JABView('ImageView')
		
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
		
		this.addPDFViewer()
		this.addImageView()
		
	}
	
	
	addPDFViewer () {
		this.addSubview(this.pdfViewer)
	}
	
	addImageView () {
		this.addSubview(this.imageView)
	}
	
	
	// Update
	updateAllUI () {
		super.updateAllUI()
		
		
		this.configurePDFViewer()
		this.positionPDFViewer()
		
		this.configureImageView()
		this.positionImageView()
	}
	
	
	
	
	// PDF Viewer
	configurePDFViewer () {
		let view = this.pdfViewer
		view.pdfDocument = this.pdfDocument
		
		view.overflowX = 'hidden'
		
		view.parameters = { reservedTopBuffer: this.parameters.reservedTopBuffer }
		view.updateAllUI()
	}
	
	positionPDFViewer () {
		let view = this.pdfViewer
		let newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = view.requiredHeight

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = 0
							
		view.frame = newFrame
	}
	
	
	
	// Image View
	configureImageView () {
		let view = this.imageView
		view.backgroundImage = resourcesDirectory + '/Images/CV Page/Photo.jpg'
	}
	
	positionImageView () {
		let view = this.imageView
		let newFrame = new CGRect()
							
		newFrame.size.width = this.parameters.sizeOfImageView
		newFrame.size.height = newFrame.size.width
		
		var rightOfPDFPage = this.width/2
		if (this.pdfViewer.pageViews.length > 0) { rightOfPDFPage = this.pdfViewer.pageViews[0].right }
		newFrame.origin.x = rightOfPDFPage + ((this.width - rightOfPDFPage) - newFrame.size.width)/2
		newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForImageView
		
		// if (sizeClass == )
							
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
	viewBackgroundImageDidLoad (view) {
		
	}
	
}