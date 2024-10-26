export interface IYoutube {
  contents: Content[];
  playlistId: string;
  isEditable: boolean;
  canReorder: boolean;
  trackingParams: string;
  targetId: string;
}

export interface Content {
  playlistVideoRenderer: PlaylistVideoRenderer;
}

export interface PlaylistVideoRenderer {
  videoId: string;
  thumbnail: Thumbnail2;
  title: Title;
  index: Index;
  shortBylineText: ShortBylineText;
  lengthText: LengthText;
  navigationEndpoint: NavigationEndpoint2;
  lengthSeconds: string;
  trackingParams: string;
  isPlayable: boolean;
  menu: Menu;
  thumbnailOverlays: ThumbnailOverlay[];
  videoInfo: Text;
}

export interface ThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: Text;
}

export interface ThumbnailOverlayTimeStatusRenderer {
  text: LengthText;
  style: string;
}

export interface Menu {
  menuRenderer: MenuRenderer;
}

export interface MenuRenderer {
  items: Item[];
  trackingParams: string;
  accessibility: Accessibility;
}

export interface Item {
  menuServiceItemRenderer: MenuServiceItemRenderer;
}

export interface MenuServiceItemRenderer {
  text: Text;
  icon: Icon;
  serviceEndpoint: ServiceEndpoint;
  trackingParams: string;
  hasSeparator?: boolean;
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata3;
  signalServiceEndpoint?: SignalServiceEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
}

export interface ShareEntityServiceEndpoint {
  serializedShareEntity: string;
  commands: Command[];
}

export interface Command {
  clickTrackingParams: string;
  openPopupAction: OpenPopupAction;
}

export interface OpenPopupAction {
  popup: Popup;
  popupType: string;
  beReused: boolean;
}

export interface Popup {
  unifiedSharePanelRenderer: UnifiedSharePanelRenderer;
}

export interface UnifiedSharePanelRenderer {
  trackingParams: string;
  showLoadingSpinner: boolean;
}

export interface SignalServiceEndpoint {
  signal: string;
  actions: Action[];
}

export interface Action {
  clickTrackingParams: string;
  addToPlaylistCommand: AddToPlaylistCommand;
}

export interface AddToPlaylistCommand {
  openMiniplayer: boolean;
  videoId: string;
  listType: string;
  onCreateListCommand: OnCreateListCommand;
  videoIds: string[];
}

export interface OnCreateListCommand {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata4;
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[];
  params: string;
}

export interface CommandMetadata4 {
  webCommandMetadata: WebCommandMetadata4;
}

export interface WebCommandMetadata4 {
  sendPost: boolean;
  apiUrl: string;
}

export interface CommandMetadata3 {
  webCommandMetadata: WebCommandMetadata3;
}

export interface WebCommandMetadata3 {
  sendPost: boolean;
  apiUrl?: string;
}

export interface Icon {
  iconType: string;
}

export interface Text {
  runs: Run[];
}

export interface NavigationEndpoint2 {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata2;
  watchEndpoint: WatchEndpoint;
}

export interface WatchEndpoint {
  videoId: string;
  playlistId: string;
  index: number;
  params: string;
  playerParams: string;
  loggingContext: LoggingContext;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig;
}

export interface CommonConfig {
  url: string;
}

export interface LoggingContext {
  vssLoggingContext: VssLoggingContext;
}

export interface VssLoggingContext {
  serializedContextData: string;
}

export interface CommandMetadata2 {
  webCommandMetadata: WebCommandMetadata2;
}

export interface WebCommandMetadata2 {
  url: string;
  webPageType: string;
  rootVe: number;
}

export interface LengthText {
  accessibility: Accessibility;
  simpleText: string;
}

export interface ShortBylineText {
  runs: Run2[];
}

export interface Run2 {
  text: string;
  navigationEndpoint: NavigationEndpoint;
}

export interface NavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: CommandMetadata;
  browseEndpoint: BrowseEndpoint;
}

export interface BrowseEndpoint {
  browseId: string;
  canonicalBaseUrl: string;
}

export interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata;
}

export interface WebCommandMetadata {
  url: string;
  webPageType: string;
  rootVe: number;
  apiUrl: string;
}

export interface Index {
  simpleText: string;
}

export interface Title {
  runs: Run[];
  accessibility: Accessibility;
}

export interface Accessibility {
  accessibilityData: AccessibilityData;
}

export interface AccessibilityData {
  label: string;
}

export interface Run {
  text: string;
}

export interface Thumbnail2 {
  thumbnails: Thumbnail[];
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
