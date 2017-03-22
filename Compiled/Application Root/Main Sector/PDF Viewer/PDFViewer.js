'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PDFViewer = function (_JABView) {
	_inherits(PDFViewer, _JABView);

	function PDFViewer(customId) {
		_classCallCheck(this, PDFViewer);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PDFViewer).call(this, customId));

		_this.pdfDocument = null;
		_this.requiredHeight = 0;

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,
			topBufferForPageViews: 30,
			betweenBufferForPageViews: 8
		};

		// UI
		_this.pageViews = [];
		for (var i = 0; i < 10; i++) {
			_this.pageViews.push(new JABView());
		}

		return _this;
	}

	//
	// Init
	//

	_createClass(PDFViewer, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(PDFViewer.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {
			this.addPageViews();
		}
	}, {
		key: 'addPageViews',
		value: function addPageViews() {
			for (var i = 0; i < this.pageViews.length; i++) {
				this.addSubview(this.pageViews[i]);
			}
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(PDFViewer.prototype), 'updateAllUI', this).call(this);

			this.configurePageViews();
			this.positionPageViews();
		}
	}, {
		key: 'configurePageViews',
		value: function configurePageViews() {
			for (var i = 0; i < this.pageViews.length; i++) {
				if (this.pdfDocument == null) {
					break;
				}
				if (this.pdfDocument.imagePaths.length <= i) {
					break;
				}
				var view = this.pageViews[i];
				view.backgroundImage = this.pdfDocument.imagePaths[i];
			}
		}
	}, {
		key: 'positionPageViews',
		value: function positionPageViews() {
			for (var i = 0; i < this.pageViews.length; i++) {
				var view = this.pageViews[i];
				var newFrame = new CGRect();
				if (this.pdfDocument == null) {
					view.frame = newFrame;
					continue;
				}
				if (this.pdfDocument.imagePaths.length <= i) {
					view.frame = newFrame;
					continue;
				}

				newFrame.size.width = applicationRoot.contentWidth * { 'xxs': 1, 'xs': 1, 's': 0.6, 'm': 0.6, 'l': 0.6, 'xl': 0.6 }[sizeClass];
				newFrame.size.height = newFrame.size.width * (11.0 / 8.5);

				newFrame.origin.x = (this.width - newFrame.size.width) / 2;
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.topBufferForPageViews + i * (newFrame.size.height + this.parameters.betweenBufferForPageViews);

				view.frame = newFrame;

				if (i == this.pdfDocument.imagePaths.length - 1) {
					this.requiredHeight = view.bottom;
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

	}, {
		key: 'viewBackgroundImageDidLoad',
		value: function viewBackgroundImageDidLoad(view) {}
	}]);

	return PDFViewer;
}(JABView);