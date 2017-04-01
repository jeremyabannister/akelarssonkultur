class MainSector extends JABView {

	constructor (customId, projectDataBundles) {
		super(customId)


		// State
		this.state = {
			shouldStartLoading: false,
			pageIndex: 0,
			
			scrollable: false,
			
			selectedProject: null,
			closingProject: false,
			
			selectedPDFDocument: null,
		}
		
		
		// Parameters
		this.parameters = {
			reservedTopBuffer: 0,
			heightOfHeader: 0,
		}
		
		this.imagePathStem = resourcesDirectory + '/Images'
		this.aboutPagePDFDocuments = []
		this.assembleAboutPagePDFDocuments()
		this.cvPDFDocument = this.assembleCVPDFDocument()
		this.pressPDFDocument = this.assemblePressPDFDocument()
		
		// UI
		this.contactPage = new ContactPage('ContactPage')
		this.upcomingPage = new UpcomingPage('UpcomingPage')
		this.projectsPage = new ProjectsPage('ProjectsPage', projectDataBundles)
		this.pressPage = new PDFViewer('PressPage')
		this.cvPage = new CVPage('CVPage')
		this.homePage = new HomePage('HomePage')
		
		this.projectPage = new ProjectPage('ProjectPage', projectDataBundles)
		
	}

	
	
	//
	// Init
	//
	
	init () {
		super.init()
		
	}
	
	
	//
	// Getters and Setters
	//
	
	get websiteClosed () {
		return this._websiteClosed
	}
	
	set websiteClosed (newWebsiteClosed) {
		if (!this.websiteClosedLocked) {
			this._websiteClosed = newWebsiteClosed
		}
	}
	
	
	get currentlyActivePage () {
		return this.pages[this.state.pageIndex]
	}
	
	get pages () {
		return [this.homePage, this.cvPage, this.pressPage, this.projectsPage, this.upcomingPage, this.contactPage, this.projectPage]
	}
	
	
	get readyToClose () {
		return (this.currentlyActivePage.state.readyToClose)
	}
	

	//
	// UI
	//
	
	// Add
	addAllUI () {
		
		this.addContactPage()
		this.addUpcomingPage()
		this.addProjectsPage()
		this.addPressPage()
		this.addCVPage()
		this.addHomePage()
		
		this.addProjectPage()
	}
	
	
	
	
	
	addContactPage () {
		this.addSubview(this.contactPage)
	}
	
	addUpcomingPage () {
		this.addSubview(this.upcomingPage)
	}
	
	addProjectsPage () {
		this.addSubview(this.projectsPage)
	}
	
	addPressPage () {
		this.addSubview(this.pressPage)
	}
	
	addCVPage () {
		this.addSubview(this.cvPage)
	}
	
	addHomePage () {
		this.addSubview(this.homePage)
	}
	
	
	
	addProjectPage () {
		this.addSubview(this.projectPage)
	}
	
	


	
	// Update
	updateAllUI () {
		super.updateAllUI()

		this.configureContactPage()
		this.positionContactPage()
		
		this.configureUpcomingPage()
		this.positionUpcomingPage()
		
		this.configureProjectsPage()
		this.positionProjectsPage()
		
		this.configurePressPage()
		this.positionPressPage()
		
		this.configureCVPage()
		this.positionCVPage()
		
		this.configureHomePage()
		this.positionHomePage()
		
		
		
		
		
		this.configureProjectPage()
		this.positionProjectPage()
		
	}
	
	
	
	
	
	
	// Contact Page
	configureContactPage () {
		let view = this.contactPage
		
		view.backgroundColor = 'white'
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		view.scrollable = true
		
		view.parameters = { reservedTopBuffer: this.parameters.heightOfHeader }
		view.opacity = {true: 1, false: 0}[this.currentlyActivePage == view]
		
		if (this.currentlyActivePage == view) { this.bringPageToFront(view) }
		
		view.updateAllUI()
	}
	
	positionContactPage () {
		let view = this.contactPage
		let newFrame = this.bounds
		view.frame = newFrame
	}
	
	
	// Upcoming Page
	configureUpcomingPage () {
		let view = this.upcomingPage
		
		view.backgroundColor = 'white'
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		
		if (this.currentlyActivePage == view) { this.bringPageToFront(view) }
		
		view.parameters = {
			reservedTopBuffer: this.parameters.heightOfHeader,
		}
	}
	
	positionUpcomingPage () {
		let view = this.upcomingPage
		let newFrame = this.bounds
		view.frame = newFrame
	}


	// Projects Page
	configureProjectsPage () {
		let view = this.projectsPage
		
		view.backgroundColor = 'white'
		view.state = { shouldStartLoading: this.state.shouldStartLoading }
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		
		view.parameters = {
			reservedTopBuffer: this.parameters.reservedTopBuffer,
			heightOfHeader: this.parameters.heightOfHeader,
		}
		
		
		view.blur = {true: 20, false: 0}[this.state.selectedProject != null]
		view.opacity = {true: 1, false: 0}[this.currentlyActivePage == view]
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			view.state = { scrollable: true }	
		}
		
		view.updateAllUI()
		
		$(view.selector).css({
			'scroll-behavior': 'smooth'
		})
		
	}
	
	positionProjectsPage () {
		var view = this.projectsPage
		var newFrame = this.bounds
		view.frame = newFrame
	}
	
	
	
	
	// Press Page
	configurePressPage () {
		let view = this.pressPage
		view.backgroundColor = 'white'
		view.pdfDocument = this.pressPDFDocument
		
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		
		view.parameters = {
			reservedTopBuffer: this.parameters.heightOfHeader,
			pageHeightToWidthAspectRatio: (3500.0/2480.0),
			fractionHeightForLastPage: 0.65,
		}
		view.opacity = {true: 1, false: 0}[this.currentlyActivePage == view]
		
		if (this.currentlyActivePage == view) { this.bringPageToFront(view) }
		
		view.updateAllUI()
	}
	
	positionPressPage () {
		let view = this.pressPage
		let newFrame = this.bounds
		view.frame = newFrame
	}
	
	
	// CV Page
	configureCVPage () {
		let view = this.cvPage
		view.backgroundColor = 'white'
		view.pdfDocument = this.cvPDFDocument
		
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		
		view.parameters = {
			reservedTopBuffer: this.parameters.heightOfHeader,
			fractionHeightForLastPage: 0.2,
			pageHeightToWidthAspectRatio: (3300.0/2480.0),
		}
		view.opacity = {true: 1, false: 0}[this.currentlyActivePage == view]
		
		if (this.currentlyActivePage == view) { this.bringPageToFront(view) }
		
		view.updateAllUI()
	}
	
	positionCVPage () {
		let view = this.cvPage
		let newFrame = this.bounds
		view.frame = newFrame
	}
	
	
	
	
	// Home Page
	configureHomePage () {
		let view = this.homePage
		
		view.backgroundColor = 'white'
		view.overflow = 'scroll'
		view.reservedTopBuffer = this.parameters.reservedTopBuffer
		view.state = {
			shouldStartLoading: this.state.shouldStartLoading,
		}
		
		if (this.currentlyActivePage == view) {
			if (!this.state.closingProject) { // closingProject is true when the projectPage is fading out, during which we do not want to reorder the pages because that will cause the project page to disappear immediately
				this.bringPageToFront(view)
			}
			
			if (!this.state.projectOpen) {
				view.currentlyActive = true
				view.scrollable = this.state.scrollable
			} else {
				view.currentlyActive = false
			}
			
			if (this.state.projectOpen) {
				view.blur = 20
			} else {
				view.blur = 0
			}
			
			view.opacity = 1
		} else {
			view.opacity = 0
			view.currentlyActive = false
		}
		
		view.updateAllUI()
	}
	
	positionHomePage () {
		var view = this.homePage
		var newFrame = this.bounds
		view.frame = newFrame
	}
	
	
	
	
	
	// Project Page
	configureProjectPage () {
		var view = this.projectPage
		
		view.clickable = true
		view.parameters.reservedTopBuffer = this.parameters.reservedTopBuffer
		view.overflowX = 'hidden'
		view.overflowY = 'scroll'
		view.state = { shouldStartLoading: this.state.shouldStartLoading }
		
		view.configureDuration = 200
		view.backgroundColor = 'rgba(255, 255, 255, 0.4)'
		
		if (this.state.selectedProject != null) {
			this.bringPageToFront(view)
			view.opacity = 1
			view.configureDelay = 0
			
			view.instantUpdate = true
			view.updateAllUI()
			view.instantUpdate = false
			
		} else {
			view.opacity = 0
			view.configureDelay = 200
		}
		
		view.updateAllUI()
	}
	
	positionProjectPage () {
		var view = this.projectPage
		var newFrame = new CGRect()
							
		newFrame.size.width = this.width
		newFrame.size.height = this.height

		newFrame.origin.x = (this.width - newFrame.size.width)/2
		newFrame.origin.y = (this.height - newFrame.size.height)/2
							
		view.frame = newFrame
	}
	

	
	
	





	//
	// Actions
	//
	
	// Navigation
	bringPageToFront (page) {
		
		var otherPages = []
		for (var i = 0; i < this.pages.length; i++) {
			if (this.pages[i] != page) {
				otherPages.push(this.pages[i])
			}
		}
		
		if (!this.subviewIsAboveSubviews(page, otherPages)) {
			this.insertSubviewAboveSubviews(page, otherPages)
		}
	}
	
	
	
	
	// Swipe
	leftSwipeDetected () {
		
	}
	
	rightSwipeDetected () {
		
	}
	
	upSwipeDetected () {
		
	}
	
	
	
	// Keys
	spaceBarWasPressed () {
		if (this.state.pageIndex == 0) {
			this.homePage.spaceBarWasPressed()
		} else if (this.state.pageIndex == 1) {
			this.projectPage.spaceBarWasPressed()
		}
	}
	
	
	leftArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.leftArrowWasPressed()
		}
	}
	
	upArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.upArrowWasPressed()
		}
	}
	
	rightArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.rightArrowWasPressed()
		}
	}
	
	downArrowWasPressed () {
		if (this.state.pageIndex == 1) {
			this.projectPage.downArrowWasPressed()
		}
	}
	
	
	
	// Data Assembly
	assembleAboutPagePDFDocuments () {
		
		let cv = new PDFDocument()
		cv.displayTitle = 'CV'
		cv.imagePaths = []
		for (var i = 0; i < 5; i++) {
			cv.imagePaths.push(this.imagePathStem + '/CV Page/CV/' + (i + 1) + '.png')
		}
		
		let article = new PDFDocument()
		article.displayTitle = 'Artikel'
		article.imagePaths = []
		for (var i = 0; i < 2; i++) {
			article.imagePaths.push(this.imagePathStem + '/Article Page/Article/' + (i + 1) + '.png')
		}
		
		
		this.aboutPagePDFDocuments = [cv, article]
		
	}
	
	
	assembleCVPDFDocument () {
		let cv = new PDFDocument()
		cv.displayTitle = 'CV'
		cv.imagePaths = []
		for (var i = 0; i < 5; i++) {
			cv.imagePaths.push(this.imagePathStem + '/CV Page/CV/' + (i + 1) + '.png')
		}
		return cv
	}
	
	assemblePressPDFDocument () {
		let article = new PDFDocument()
		article.displayTitle = 'Artikel'
		article.imagePaths = []
		for (var i = 0; i < 2; i++) {
			article.imagePaths.push(this.imagePathStem + '/Article Page/Article/' + (i + 1) + '.png')
		}
		return article
	}
	


	//
	// Delegate
	//
	
	// JABView
	viewWasClicked (view) {
		if (view == this.projectPage) {
			if (view.state.handlingClick) {
				view.state = {handlingClick: false}
			} else {
				this.state = {
					selectedProject: null,
					closingProject: true,
				}
				this.projectPage.state = {
					projectIndex: null,
					imageIndex: null,
				}
				var mainSector = this
				this.parent.mainSectorWantsToRelinquishFullScreen(this)
				this.animatedUpdate(null, function () {
					mainSector.state = {
						closingProject: false,
					}
					mainSector.updateAllUI()
				})
			}
		}
	}
	
	// Contact Page
	
	
	// Projects Page
	projectsPageWantsToOpenProject (projectsPage, projectDataBundle) {
		
		this.state = { selectedProject: projectDataBundle }
		this.projectPage.loadProjectDataBundle(projectDataBundle)
		this.parent.mainSectorWantsToUseFullScreen(this)
		this.animatedUpdate()
	}
	
	
	
	// Home Page
	
	
	// Project Page
	projectPageDidChangeProjectIndexTo(projectPage, projectIndex) {
		this.state = {selectedProjectIndex: projectIndex}
	}
}