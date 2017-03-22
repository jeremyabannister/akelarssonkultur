'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectRegion = function (_JABView) {
	_inherits(ProjectRegion, _JABView);

	function ProjectRegion(customId) {
		_classCallCheck(this, ProjectRegion);

		// State

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectRegion).call(this, customId));

		_this.imagePath = '';

		// Parameters
		_this.parameters = {
			reservedTopBuffer: 0,

			minimumDistanceFromImageViewToLogo: 15,
			imageAspectRatio: 2448.0 / 3264.0,

			topBufferForCaptionLabel: 20
		};

		// UI
		_this.imageView = new JABView('ImageView');
		_this.captionLabel = new UILabel('CaptionLabel');

		return _this;
	}

	//
	// Init
	//

	_createClass(ProjectRegion, [{
		key: 'init',
		value: function init() {
			_get(Object.getPrototypeOf(ProjectRegion.prototype), 'init', this).call(this);
		}

		//
		// UI
		//

		// Add

	}, {
		key: 'addAllUI',
		value: function addAllUI() {

			this.addImageView();
			this.addCaptionLabel();
		}
	}, {
		key: 'addImageView',
		value: function addImageView() {
			this.addSubview(this.imageView);
		}
	}, {
		key: 'addCaptionLabel',
		value: function addCaptionLabel() {
			this.addSubview(this.captionLabel);
		}

		// Update

	}, {
		key: 'updateAllUI',
		value: function updateAllUI() {
			_get(Object.getPrototypeOf(ProjectRegion.prototype), 'updateAllUI', this).call(this);

			this.configureImageView();
			this.positionImageView();

			this.configureCaptionLabel();
			this.positionCaptionLabel();
		}

		// Image View

	}, {
		key: 'configureImageView',
		value: function configureImageView() {
			var view = this.imageView;
			view.clickable = true;

			view.backgroundImage = this.imagePath;
			view.backgroundSize = 'contain';
		}
	}, {
		key: 'positionImageView',
		value: function positionImageView() {
			var view = this.imageView;
			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth * 0.7;
			newFrame.size.height = newFrame.size.width * this.parameters.imageAspectRatio;

			// Now calculated the unused height or width of imageView and eliminate it. This will not alter the size of the image, only the fact that without this there is an invisible region around the image which intercepts a click but does not react.
			if (view.backgroundImageLoaded && view.backgroundImageObject.width != 0 && this.parameters.imageAspectRatio != 0) {
				var actualAspectRatio = view.backgroundImageObject.height / view.backgroundImageObject.width;
				if (actualAspectRatio > this.parameters.imageAspectRatio) {
					newFrame.size.width -= newFrame.size.height / this.parameters.imageAspectRatio - newFrame.size.height / actualAspectRatio;
				} else {
					newFrame.size.height -= newFrame.size.width * (this.parameters.imageAspectRatio - actualAspectRatio);
				}
			}

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.parameters.reservedTopBuffer + (this.height - this.parameters.reservedTopBuffer - newFrame.size.height) / 2;

			if (newFrame.origin.y < this.parameters.reservedTopBuffer + this.parameters.minimumDistanceFromImageViewToLogo) {
				newFrame.origin.y = this.parameters.reservedTopBuffer + this.parameters.minimumDistanceFromImageViewToLogo;
			}

			view.frame = newFrame;
		}

		// Caption Label

	}, {
		key: 'configureCaptionLabel',
		value: function configureCaptionLabel() {
			var view = this.captionLabel;
			view.clickable = true;

			view.text = "";

			view.textColor = 'black';
			view.fontSize = 14;
			view.fontFamily = 'siteFont';
			view.fontWeight = 'normal';
			view.lineHeight = 1.7;
		}
	}, {
		key: 'positionCaptionLabel',
		value: function positionCaptionLabel() {
			var view = this.captionLabel;
			var newFrame = new CGRect();

			newFrame.size.width = applicationRoot.contentWidth * 0.7;
			var size = view.font.sizeOfString(view.text, newFrame.size.width);

			newFrame.size.height = size.height;

			newFrame.origin.x = (this.width - newFrame.size.width) / 2;
			newFrame.origin.y = this.imageView.bottom + this.parameters.topBufferForCaptionLabel;

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
		key: 'viewWasClicked',
		value: function viewWasClicked(view) {
			this.parent.projectRegionUIInterceptedClick(self);
		}
	}, {
		key: 'viewBackgroundImageDidLoad',
		value: function viewBackgroundImageDidLoad(view) {
			this.imageView.positionDuration = 0;
			this.positionImageView();
			this.imageView.positionDuration = null;
		}
	}]);

	return ProjectRegion;
}(JABView);