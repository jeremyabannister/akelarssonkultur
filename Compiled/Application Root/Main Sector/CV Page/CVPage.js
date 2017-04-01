'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CVPage = function (_JABView) {
	_inherits(CVPage, _JABView);

	function CVPage(customId) {
		_classCallCheck(this, CVPage);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CVPage).call(this, customId));

		_this.pdfDocument = null;

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,

			sizeOfImageView: 200,
			topBufferForImageView: 60,

			pageHeightToWidthAspectRatio: 11.0 / 8.5,
			fractionHeightForLastPage: null
		};

		// UI
		_this.pdfViewer = new PDFViewer('PDFViewer');
		_this.imageView = new JABView('ImageView');

		return _this;
	}

	//
	// Init
	//

	_createClass(CVPage, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(CVPage.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addPDFViewer();
			this.addImageView();
		}
	}, {
		key: 'addPDFViewer',
		value: function addPDFViewer() {
			this.addSubview(this.pdfViewer);
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(CVPage.prototype), 'updateAllUI', this).call(this);

			this.configurePDFViewer();
			this.positionPDFViewer();

			this.configureImageView();
			this.positionImageView();
		}

		// PDF Viewer

	}, {
		key: 'configurePDFViewer',
		value: function configurePDFViewer() {
			var view = this.pdfViewer;
			view.pdfDocument = this.pdfDocument;

			view.overflowX = 'hidden';

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				view.parameters = { reservedTopBuffer: this.parameters.reservedTopBuffer + this.parameters.sizeOfImageView + this.parameters.topBufferForImageView };
			} else {
				view.parameters = {
					reservedTopBuffer: this.parameters.reservedTopBuffer,
					pageHeightToWidthAspectRatio: this.parameters.pageHeightToWidthAspectRatio,
					fractionHeightForLastPage: this.parameters.fractionHeightForLastPage
				};
			}

			view.updateAllUI();
		}
	}, {
		key: 'positionPDFViewer',
		value: function positionPDFViewer() {
			var view = this.pdfViewer;
			var newFrame = new CGRect();

			newFrame.size.width = this.width;
			newFrame.size.height = view.requiredHeight;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = 0;

			view.frame = newFrame;
		}

		// Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {
			var view = this.imageView;
			view.backgroundImage = resourcesDirectory + '/Images/CV Page/Photo.jpg';
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {
			var view = this.imageView;
			var newFrame = new CGRect();

			newFrame.size.width = this.parameters.sizeOfImageView;
			newFrame.size.height = newFrame.size.width;

			var rightOfPDFPage = this.width / 2;
			if (this.pdfViewer.pageViews.length > 0) {
				rightOfPDFPage = this.pdfViewer.pageViews[0].right;
			}
			newFrame.origin.x = rightOfPDFPage + (this.width - rightOfPDFPage - newFrame.size.width) / 2;

			if (sizeClass == 'xxs' || sizeClass == 'xs') {
				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			}

			newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForImageView;

			// if (sizeClass == )

			view.frame = newFrame;
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

	}, {
		key: 'viewBackgroundImageDidLoad',
		value: function viewBackgroundImageDidLoad(view) {}
	}]);

	return CVPage;
}(JABView);