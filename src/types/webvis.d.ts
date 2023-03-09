declare module webvis {
  /**
   * The direction in which the animation plays.
   */
  export enum AnimationDirection {
    FORWARD = 'forward',
    REVERSE = 'reverse',
  }
  /**
   * The play state of an animation.
   */
  export enum AnimationPlayState {
    INITIAL = 'initial',
    RUNNING = 'running',
    PAUSED = 'paused',
  }
  /**
   * The properties of an [[AnimationFrame]].
   */
  export enum AnimationProperty {
    CENTER = 'center',
    COLOR = 'color',
    ROTATION = 'rotation',
    SCALE = 'scale',
    TRANSLATION = 'translation',
    OPACITY = 'opacity',
    ENABLED = 'enabled',
  }
  /**
   * Defines how an animation progresses through the duration of each iteration.
   */
  export enum AnimationTimingFunction {
    LINEAR = 'linear',
    EASEIN = 'easein',
    EASEOUT = 'easeout',
    EASEINOUT = 'easeinout',
  }
  /**
   * The origin that is used for transformation operations.
   */
  export enum AnimationTransformOrigin {
    CENTER = 'center',
    CUSTOM = 'custom',
  }

  /**
   * ANIMATION_ENDED
   * @event ANIMATION_ENDED
   */
  export class AnimationEndedEvent extends WebVisEvent {
    animationName: string;
    targetNodeID: number;
    options: AnimationOptions;
    /**
     * This event signals a that an animation has ended.
     * @param {string} animationName The name of the started animation.
     * @param {number} targetNodeID The node id which runs the animation.
     */
    constructor(
      animationName: string,
      targetNodeID: number,
      options: AnimationOptions
    );
  }

  /**
   * ANIMATION_FRAMES_CREATED
   * @event ANIMATION_FRAMES_CREATED
   */
  export class AnimationFramesCreatedEvent extends WebVisEvent {
    name: string;
    frames: Array<AnimationFrame>;
    /**
     * This event signals that new animation frames were created.
     * @param {string} name The name of the generated Animation frames.
     */
    constructor(name: string, frames: Array<AnimationFrame>);
  }

  /**
   * ANIMATION_FRAMES_REMOVED
   * @event ANIMATION_FRAMES_REMOVED
   */
  export class AnimationFramesRemovedEvent extends WebVisEvent {
    name: string;
    /**
     * This event signals that animation frames were removed.
     * @param {string} name The name of the removed Animation frames.
     */
    constructor(name: string);
  }

  /**
   * ANIMATION_ITERATION
   * @event ANIMATION_ITERATION
   */
  export class AnimationIterationEvent extends WebVisEvent {
    animationName: string;
    targetNodeID: number;
    iteration: number;
    /**
     * This event signals a that an animation finished an iteration.
     * @param {string} animationName The name of the started animation.
     * @param {number} targetNodeID The node id which runs the animation.
     * @param {number} iteration The current iteration.
     */
    constructor(animationName: string, targetNodeID: number, iteration: number);
  }

  /**
   * ANIMATION_STARTED
   * @event ANIMATION_STARTED
   */
  export class AnimationStartedEvent extends WebVisEvent {
    animationName: string;
    targetNodeID: number;
    options: AnimationOptions;
    /**
     * This event signals that an animation has started.
     * @param {string} animationName The name of the started animation.
     * @param {number} targetNodeID The node id which runs the animation.
     */
    constructor(
      animationName: string,
      targetNodeID: number,
      options: AnimationOptions
    );
  }

  /**
   * The **AnimationAPI** provides basic functionalities to define keyframe-based animation sequences.
   * An animation sequence defines a gradual change from one node state to another, whereby a single
   * state is defined by an [[AnimationFrame]] which includes different properties to specify the
   * transformation and appearance of a node at that point in time. An animation sequence is independent
   * of a specific node and can be applied to multiple nodes with different [[AnimationOptions]].
   *
   * **Example**
   * ```typescript
   * // Get an instance of the ContextAPI
   * const myContext : ContextAPI = webvis.getContext( "example" )
   *
   * // Create a simple animation sequence which does a full rotation around the Y-axis
   * myContext.createAnimationFrames( "rotate" , [
   *  { rotation: [ 0, 0,   0 ] },
   *  { rotation: [ 0, 180, 0 ] },
   *  { rotation: [ 0, 360, 0 ] }
   * ]);
   *
   * // Apply the animation sequence to an InstanceGraph node with a total duration of 1000ms
   * myContext.setProperty( 1, "animation", {
   *    name     : "rotate",
   *    duration : 1000,
   * });
   * ```
   *
   * **Restrictions**
   *
   * Animation sequences that include transformations and are applied to a leaf node cannot yet be visualized by the viewer.
   */
  export interface AnimationAPI {
    /**
     * Creates a new keyframe-based animation sequence.
     * @param name The name of the animation sequence.
     * @param frames The keyframes of the animation sequence.
     */
    createAnimationFrames(name: string, frames: Array<AnimationFrame>): void;
    /**
     * Removes an existing animation sequence.
     * @param name Specifies the name of the animation frames.
     */
    removeAnimationFrames(name: string): void;
    /**
     *
     * @param nodeID
     * @param name
     * @param options
     * @hidden
     */
    animate(nodeID: number, name: string, options: AnimationOptions): void;
  }
  /**
   * An **AnimationFrame** defines a single state inside of an animation sequence.
   */
  export type AnimationFrame = {
    /**
     * The center point which is used for all rotation and scale interpolations.
     * @default [0, 0, 0]
     */
    center?: [number, number, number];
    /**
     * The color as [r,g,b], [r,g,b,a], string (hexadecimal value or HTML Color Code). Use null to reset.
     * @default null
     */
    color?:
      | [number, number, number]
      | [number, number, number, number]
      | string
      | null;
    /**
     * The rotation as Euler angles [x,y,z] or Quaternion [C,xS,yS,zS].
     * @default [0, 0, 0]
     */
    rotation?: [number, number, number] | [number, number, number, number];
    /**
     * The scale as [x,y,z].
     * @default [1, 1, 1]
     */
    scale?: [number, number, number];
    /**
     * The translation as [x,y,z].
     * @default [0, 0, 0]
     */
    translation?: [number, number, number];
    /**
     * The opacity between 0 and 1.
     * @default 1
     */
    opacity?: number;
    /**
     * The time between 0 and 1.
     * @default 0
     */
    time?: number;
    /**
     * The enabled state as true or false.
     * @default true
     */
    enabled?: boolean;
  };

  /**
   * The **AnimationOptions** provide additional options of a whole animation sequence.
   */
  export type AnimationOptions = {
    /**
     * The total duration of the animation sequence in milliseconds.
     * @default 1000
     */
    duration?: number;
    /**
     * The initial delay of the animation sequence.
     * @default 0
     */
    delay?: number;
    /**
     * The timing function used for the interpolation.
     * @default "linear"
     */
    timingFunction?: AnimationTimingFunction;
    /**
     * The number of iterations of the animation sequence.
     * @default 1
     */
    iterationCount?: number;
    /**
     * The playback rate of the animation sequence.
     * @default 1
     */
    playbackRate?: number;
    /**
     * The current time of the animation sequence between 0 and the total duration.
     * @default 0
     */
    time?: number;
    /**
     * The play state of the animation sequence.
     * @default "initial"
     */
    playState?: AnimationPlayState;
  };

  /**
   * ANNOTATION_CHANGED
   * @event ANNOTATION_CHANGED
   */
  export class AnnotationChangedEvent extends WebVisEvent {
    annotationID: number;
    label?: string | undefined;
    visible?: boolean | undefined;
    anchorPosition?: Float32Array | Array<number> | undefined;
    labelPosition?: Float32Array | Array<number> | undefined;
    active?: boolean | undefined;
    transform?: Float32Array | Array<number> | undefined;
    trustedSource?: boolean;
    /**
     * The AnnotationChangedEvent occurs if an annotation was changed.
     * @param annotationID        The ID of the annotation.
     * @param label               The text of the annotation.
     * @param visible             Indicates if the annotation should be visible or hidden.
     * @param anchorPosition      Anchor position in world space coordinates.
     * @param labelPosition       Label position in world space coordinates.
     * @param active              Indicates if the annotation is active or not.
     * @param transform           The local transform matrix of the annotation.
     * @param trustedSource       Specifies if the annotation content comes from a trusted source.
     */
    constructor(
      annotationID: number,
      label?: string | undefined,
      visible?: boolean | undefined,
      anchorPosition?: Float32Array | Array<number> | undefined,
      labelPosition?: Float32Array | Array<number> | undefined,
      active?: boolean | undefined,
      transform?: Float32Array | Array<number> | undefined,
      trustedSource?: boolean
    );
  }

  /**
   * ANNOTATION_CREATED
   * @event ANNOTATION_CREATED
   */
  export class AnnotationCreatedEvent extends WebVisEvent {
    annotationID: number;
    label: string;
    visible: boolean;
    anchorPosition: Float32Array | Array<number>;
    labelPosition: Float32Array | Array<number>;
    explicitOffset: boolean;
    transform?: Float32Array | Array<number>;
    trustedSource?: boolean;
    nodeID?: number;
    /**
     * The AnnotationCreatedEvent occurs if an annotation was created.
     * @param annotationID        The ID of the annotation.
     * @param label               The text of the annotation.
     * @param visible             Indicates if the annotation should be visible or hidden.
     * @param anchorPosition      Anchor position in world space coordinates.
     * @param labelPosition       Label position in world space coordinates.
     * @param explicitOffset      Label offset was explicitly defined.
     * @param transform           The local transform matrix of the annotation.
     * @param trustedSource       Specifies if the annotation content comes from a trusted source.
     * @param nodeID              Specifies the ID of the Node where the annotation is attached to.
     */
    constructor(
      annotationID: number,
      label: string,
      visible: boolean,
      anchorPosition: Float32Array | Array<number>,
      labelPosition: Float32Array | Array<number>,
      explicitOffset: boolean,
      transform?: Float32Array | Array<number>,
      trustedSource?: boolean,
      nodeID?: number
    );
  }

  /**
   * ANNOTATION_REMOVED
   * @event ANNOTATION_REMOVED
   */
  export class AnnotationRemovedEvent extends WebVisEvent {
    annotationID: number;
    /**
     * The AnnotationRemovedEvent occurs if an annotation was removed.
     * @param annotationID        The ID of the annotation.
     */
    constructor(annotationID: number);
  }

  /**
   * These functions allow the creation and management of annotations.
   */
  export interface AnnotationAPI {
    /**
     * Creates a new annotation.
     *
     * @param nodeID The ID of the node that the annotation belongs to.
     * @param label The text of the annotation.
     * @param visible Indicates if the annotation should be visible or hidden.
     * @param anchorPosition Anchor position in world space coordinates.
     * @param labelOffset The offset between anchorPosition and where the label should be displayed.
     *
     * @return The ID of the new annotation.
     */
    createAnnotation(
      nodeID: number,
      label: string,
      visible?: boolean,
      anchorPosition?: Float32Array | Array<number>,
      labelOffset?: Float32Array | Array<number>
    ): number;
    /**
     * Changes an annotation.
     *
     * @param annotationID The ID of the annotation.
     * @param label The text of the annotation.
     * @param visible Indicates if the annotation should be visible or hidden.
     * @param anchorPosition Anchor position in world space coordinates.
     * @param labelPosition The position of the label.
     * @param active DEPRECATED
     * @param transform The transformation of the annotation.
     */
    changeAnnotation(
      annotationID: number,
      label?: string,
      visible?: boolean,
      anchorPosition?: Float32Array | Array<number>,
      labelPosition?: Float32Array | Array<number>,
      active?: boolean,
      transform?: Float32Array | Array<number>
    ): void;
    /**
     * Removes an annotation.
     *
     * @param annontationID The ID of the annotation.
     */
    removeAnnotation(annontationID: number): void;
    /**
     * @param annontationID The ID of the annotation.
     * @returns The content and properties of an annotation.
     */
    getAnnotationData(annotationID: number): AnnotationData;
    /**
     * @returns {Array<number>} The ids of all available annotations
     */
    getAnnotations(): Array<number>;
  }
  /**
   * Defines the properties and content of an annotation.
   */
  export type AnnotationData = {
    nodeID: number;
    label: string;
    visible: boolean;
    active: boolean;
    explicitOffset: boolean;
    anchorPosition: [number, number, number] | Float32Array;
    labelPosition: [number, number, number] | Float32Array;
    transform:
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    trustedSource: boolean;
  };
  /**
   * The content type of the attachment.
   */
  export enum AttachmentType {
    TEXT = 'text',
    JSON = 'json',
    ARRAYBUFFER = 'arraybuffer',
    BLOB = 'blob',
    DOCUMENT = 'document',
  }

  /**
   * ATTACHMENT_CREATED
   * @event ATTACHMENT_CREATED
   */
  export class AttachmentCreatedEvent extends WebVisEvent {
    attachmentID: number;
    dataType: AttachmentType;
    /**
     * This event signals a that a new attachment was created.
     * @param {number} attachmentID The id of the attachment.
     * @param {AttachmentType} dataType The type of the attachment data.
     */
    constructor(attachmentID: number, dataType: AttachmentType);
  }

  /**
   * ATTACHMENT_DATA_CHANGED
   * @event ATTACHMENT_DATA_CHANGED
   */
  export class AttachmentDataChangedEvent<T = any> extends WebVisEvent {
    attachmentID: number;
    data: T;
    /**
     * This event signals a that the data of an attachment was changed.
     * @param {number} attachmentID The id of the attachment.
     * @param {*} data The new attachment data.
     */
    constructor(attachmentID: number, data: T);
  }

  /**
   * ATTACHMENT_REMOVED
   * @event ATTACHMENT_REMOVED
   */
  export class AttachmentRemovedEvent extends WebVisEvent {
    attachmentID: number;
    /**
     * This event signals a that an attachment was removed.
     * @param {number} attachmentID The id of the attachment.
     */
    constructor(attachmentID: number);
  }

  /**
   * With the AttachmentAPI you can access additional data attached to a node.
   */
  export interface AttachmentAPI {
    /**
     * Creates a new attachment.
     *
     * @param {AttachmentType} [dataType] Specifies the attachment data type.
     * @return {number} The attachment id.
     */
    createAttachment(dataType: AttachmentType): number;
    /**
     * Removes an existing attachment.
     *
     * @param {number} [attachmentID] Specifies the attachment object.
     */
    removeAttachment(attachmentID: number): void;
    /**
     * Fetches & returns the attachment data.
     *
     * @param {number} [attachmentID] Specifies the attachment object.
     * @return {Promise<any>} The attached data.
     */
    fetchAttachmentData<T = any>(attachmentID: number): Promise<T>;
    /**
     * Returns the attachment data.
     *
     * @param {number} [attachmentID] Specifies the attachment object.
     * @return {Promise<any>} The attached data
     * @deprecated getAttachmentData is deprecated, please use [[fetchAttachmentData]] instead.
     */
    getAttachmentData<T = any>(attachmentID: number): T;
    /**
     * Sets the attachment data.
     *
     * @param {number} [attachmentID] Specifies the attachment object.
     * @param {any} [data] The new attachment data.
     */
    setAttachmentData<T = any>(attachmentID: number, data: T): void;
    /**
     * Returns the attachment data URI.
     *
     * @param {number} [attachmentID] Specifies the attachment object.
     */
    getAttachmentDataURI(attachmentID: number): string;
    /**
     * Sets the attachment data URI.
     *
     * @param {number} [attachmentID] Specifies the attachment object.
     * @param {string} [dataURI] The attachment data URI.
     */
    setAttachmentDataURI(attachmentID: number, dataURI: string): void;
  }

  /**
   * @event CLIPPING_ROOM_CHANGED
   */
  export class ClippingRoomChangedEvent extends WebVisEvent {
    clipRoomID: number;
    properties: ClipRoomProperties;
    /**
     * The ClippingRoomChangedEvent occurs if a clip room was changed.
     * @param {number} clipRoomID - The ID of the clip room.
     * @param {ClipPlaneProperties} properties - An object with the changed properties.
     */
    constructor(clipRoomID: number, properties: ClipRoomProperties);
    /**
     * @deprecated disabled is deprecated, please use properties.enabled instead.
     */
    get disabled(): boolean;
    /**
     * @deprecated invisible is deprecated, please use properties.invisible instead.
     */
    get invisible(): boolean;
    /**
     * @deprecated name is deprecated, please use properties.name instead.
     */
    get name(): string;
    /**
     * @deprecated size is deprecated, please use properties.size instead.
     */
    get size(): [number, number, number] | Float32Array;
    /**
     * @deprecated transformation is deprecated, please use properties.transform instead.
     */
    get transformation():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
  }

  /**
   * @event CLIPPING_ROOM_CREATED
   */
  export class ClippingRoomCreatedEvent extends WebVisEvent {
    clipRoomID: number;
    properties: ClipRoomProperties;
    /**
     * The ClippingRoomCreatedEvent occurs if a clip room was created.
     * @param {number} clipRoomID - The ID of the clip room.
     * @param {ClipRoomProperties} properties - An object with the clip room properties.
     */
    constructor(clipRoomID: number, properties: ClipRoomProperties);
    /**
     * @deprecated disabled is deprecated, please use properties.enabled instead.
     */
    get disabled(): boolean;
    /**
     * @deprecated invisible is deprecated, please use properties.invisible instead.
     */
    get invisible(): boolean;
    /**
     * @deprecated name is deprecated, please use properties.name instead.
     */
    get name(): string;
    /**
     * @deprecated size is deprecated, please use properties.size instead.
     */
    get size(): [number, number, number] | Float32Array;
    /**
     * @deprecated transformation is deprecated, please use properties.transformation instead.
     */
    get transformation():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
  }

  /**
   * @event CLIPPING_ROOM_REMOVED
   */
  export class ClippingRoomRemovedEvent extends WebVisEvent {
    clipRoomID: number;
    /**
     * The ClippingRoomRemovedEvent occurs if a clip room was removed.
     */
    constructor(clipRoomID: number);
  }

  /**
   * CLIPPLANE_CHANGED
   * @event CLIPPLANE_CHANGED
   */
  export class ClipPlaneChangedEvent extends WebVisEvent {
    clipPlaneID: number;
    properties: ClipPlaneProperties;
    /**
     * The ClipPlaneChangedEvent occurs if a clipplane was changed.
     * @param {number} clipPlaneID - The ID of the clipplane.
     * @param {ClipPlaneProperties} properties - An object with the changed properties.
     */
    constructor(clipPlaneID: number, properties: ClipPlaneProperties);
    /**
     * @deprecated disabled is deprecated, please use properties.enabled instead.
     */
    get disabled(): boolean;
    /**
     * @deprecated invisible is deprecated, please use properties.invisible instead.
     */
    get invisible(): boolean;
    /**
     * @deprecated localTransform is deprecated, please use properties.transform instead.
     */
    get localTransform():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    /**
     * @deprecated name is deprecated, please use properties.name instead.
     */
    get name(): string;
    /**
     * @deprecated normal is deprecated, please use properties.normal instead.
     */
    get normal(): [number, number, number] | Float32Array;
    /**
     * @deprecated position is deprecated, please use properties.position instead.
     */
    get position(): [number, number, number] | Float32Array;
    /**
     * @deprecated point is deprecated, please use properties.position instead.
     */
    get point(): [number, number, number] | Float32Array;
    /**
     * @deprecated tangent is deprecated, please use properties.tangent instead.
     */
    get tangent(): [number, number, number] | Float32Array;
    /**
     * @deprecated thickness is deprecated, please use properties.thickness instead.
     */
    get thickness(): number;
  }

  /**
   * CLIPPLANE_CREATED
   * @event CLIPPLANE_CREATED
   */
  export class ClipPlaneCreatedEvent extends WebVisEvent {
    clipPlaneID: number;
    properties: ClipPlaneProperties;
    /**
     * The ClipPlaneCreatedEvent occurs if a clip plane was created.
     * @param clipPlaneID       The ID of the clip plane.
     * @param {ClipPlaneProperties} properties - An object with the changed properties.
     */
    constructor(clipPlaneID: number, properties: ClipPlaneProperties);
    /**
     * @deprecated disabled is deprecated, please use properties.enabled instead.
     */
    get disabled(): boolean;
    /**
     * @deprecated invisible is deprecated, please use properties.invisible instead.
     */
    get invisible(): boolean;
    /**
     * @deprecated localTransform is deprecated, please use properties.transform instead.
     */
    get localTransform():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    /**
     * @deprecated name is deprecated, please use properties.name instead.
     */
    get name(): string;
    /**
     * @deprecated normal is deprecated, please use properties.normal instead.
     */
    get normal(): [number, number, number] | Float32Array;
    /**
     * @deprecated position is deprecated, please use properties.position instead.
     */
    get position(): [number, number, number] | Float32Array;
    /**
     * @deprecated point is deprecated, please use properties.position instead.
     */
    get point(): [number, number, number] | Float32Array;
    /**
     * @deprecated tangent is deprecated, please use properties.tangent instead.
     */
    get tangent(): [number, number, number] | Float32Array;
    /**
     * @deprecated thickness is deprecated, please use properties.thickness instead.
     */
    get thickness(): number;
  }

  /**
   * CLIPPLANE_REMOVED
   * @event CLIPPLANE_REMOVED
   */
  export class ClipPlaneRemovedEvent extends WebVisEvent {
    clipPlaneID: number;
    /**
     * The ClipPlaneRemovedEvent occurs if a clipplane was removed.
     * @param clipPlaneID       The ID of the clipplane.
     */
    constructor(clipPlaneID: number);
  }
  /**
   * Clipplanes are used to spatially exclude parts of the geometry from the visualization
   * by defining a separating plane.
   */

  export interface ClipPlaneAPI {
    /**
     * Creates a new clip plane.
     * @param {ClipPlaneProperties} properties - Initial properties of the created clip plane.
     * @returns {number} The id of the newly created clip plane.
     */
    createClipPlane(properties?: ClipPlaneProperties): number;
    /**
     * Creates a clip plane defined by the plane’s normal, positioned at an optional point (otherwise at
     * the world space origin) and an optional name. Returns the ID of the clip plane.
     *
     * @deprecated Calling createClipPlane with single parameters is deprecated, please use ClipPlaneProperties instead.
     * @param normal The normal of the clip plane
     * @param point  An arbitrary point in space which lies on the clip plane
     * @param name   The name of the clip plane
     * @param thickness   The thickness of the clip plane
     * @param tangent   The tangent of the clip plane
     * @param disabled   The state of the clip plane
     * @param invisible   Invisible on the UI
     * @param exclusive   set the exclusive flag to clip geometry when using exclusiveClipplanes property
     *
     * @returns      The ID of the newly created clip plane
     */
    createClipPlane(
      normal?: Float32Array | Array<number>,
      point?: Float32Array | Array<number>,
      name?: string,
      thickness?: number,
      tangent?: Float32Array | Array<number>,
      disabled?: boolean,
      invisible?: boolean,
      exclusive?: boolean
    ): number;
    /**
     * Changes one or more properties of a clip plane with the specified id.
     * @param {number} clipPlaneId - The id of the clip plane you want to change.
     * @param {ClipPlaneProperties} properties - The properties of the clip plane you want change.
     * @returns {ClipPlaneProperties} An Object with the changed Properties.
     */
    changeClipPlane(
      clipPlaneId: number,
      properties: ClipPlaneProperties
    ): ClipPlaneProperties;
    /**
     * Changes the properties of the clip plane defined by the clipPlaneID with the optional parameters
     * normal, points and name.
     *
     * @deprecated Calling changeClipPlane with single parameters is deprecated, please use ClipPlaneProperties instead.
     * @param clipPlaneID The ID of an existing clip plane which should be changed
     * @param normal      The new normal of the clip plane
     * @param point       An arbitrary new point in space which lies on the clip plane
     * @param name        The new name for the clip plane
     * @param thickness   The thickness for the clip plane
     * @param tangent     The tangent of the clip plane
     * @param disabled    The enabled state of the clip plane
     * @param invisible   Invisible on the UI
     * @param exclusive   set the exclusive flag to clip geometry when using exclusiveClipplanes property
     */
    changeClipPlane(
      clipPlaneID: number,
      normal?: Float32Array | Array<number>,
      point?: Float32Array | Array<number>,
      name?: string,
      thickness?: number,
      tangent?: Float32Array | Array<number>,
      disabled?: boolean,
      invisible?: boolean,
      exclusive?: boolean
    ): void;
    /**
     * Returns the ids of all available clip planes.
     * @returns {Array<number>} The ids of all available clip planes.
     */
    getClipPlanes(): Array<number>;
    /**
     * Returns the ClipPlaneData for the specified clip plane id.
     * @param {number} clipPlaneId - The id of the clip plane you want to request the data for.
     * @returns {Promise<ClipPlaneProperties>} The requested clip plane data.
     */
    requestClipPlaneData(clipPlaneId: number): Promise<ClipPlaneProperties>;
    /**
     * Removes a clip room with the specified id.
     * @param {number} clipPlaneId - The id of the clip room you want to remove.
     */
    removeClipPlane(clipPlaneId: number): void;
    /**
     * Creates a new clip room.
     * @param {ClipRoomProperties} properties - Initial properties of the created clip room.
     * @returns {number} The id of the newly created clip room.
     */
    createClippingRoom(properties?: ClipRoomProperties): void;
    /**
     * @deprecated Calling createClippingRoom with single parameters is deprecated, please use ClipRoomProperties instead.
     *
     * Creates a new clip room.
     *
     * @param {string} name - The name of the clip room.
     * @param {Float32Array | Array<number>} size - The size of the clip room.
     * @param {Float32Array | Array<number>} transformation - The transformation of the clip room.
     * @param {boolean} disabled - The disabled state of the clip room.
     * @param {boolean} invisible - The invisible state of the clip room.
     */
    createClippingRoom(
      name?: string,
      size?: Float32Array | Array<number>,
      transformation?: Float32Array | Array<number>,
      disabled?: boolean,
      invisible?: boolean
    ): void;
    /**
     * Changes one or more properties of a clip room with the specified id.
     * @param {ClipRoomProperties} properties - The properties of the clip room you want change.
     * @returns {ClipRoomProperties} An object with the changed properties.
     */
    changeClippingRoom(properties?: ClipRoomProperties): ClipRoomProperties;
    /**
     * @deprecated Calling changeClippingRoom with single parameters is deprecated, please use ClipRoomProperties instead.
     *
     * Changes one or more properties of a clip room with the specified id.
     *
     * @param {string} name - The name of the clip room.
     * @param {Float32Array | Array<number>} size - The size of the clip room.
     * @param {Float32Array | Array<number>} transformation - The transformation of the clip room.
     * @param {boolean} disabled - The disabled state of the clip room.
     * @param {boolean} invisible - The invisible state of the clip room.
     * @returns {ClipRoomProperties} An object with the changed properties.
     */
    changeClippingRoom(
      name?: string,
      size?: Float32Array | Array<number>,
      transformation?: Float32Array | Array<number>,
      disabled?: boolean,
      invisible?: boolean
    ): ClipRoomProperties;
    /**
     * Removes the clip room.
     */
    removeClippingRoom(): void;
    /**
     * Returns the id the clip room.
     *
     * @returns {Array<number>} The id the clip room.
     */
    getClipRoom(): number;
    /**
     * Returns the ClipRoomData.
     *
     * @returns {Promise<ClipRoomProperties>} The requested clip room data.
     */
    requestClipRoomData(): Promise<ClipRoomProperties>;
    /**
     * Creates a clip room around the box volume of the specified node.
     *
     * @param target ID(s) of the target Node(s).
     */
    clipOtherParts(target: number | Array<number>): void;
    /**
     * Generates capping geometry for the surface that is cut by the clip plane. The generated surfaces allow
     * measurements and all other operations which can be performed on usual geometry.
     * @experimental
     * @param clipPlaneId the id of the clip plane
     */
    createCapping(clipPlaneId: number): Promise<void>;
    /**
     * Enables the generated capping geometry.
     * @experimental
     * @param clipPlaneId the id of the clip plane
     */
    enableCapping(clipPlaneId: number): Promise<void>;
    /**
     * Disables the generated capping geometry.
     * @experimental
     * @param clipPlaneId the id of the clip plane
     */
    disableCapping(clipPlaneId: number): Promise<void>;
    /**
     * Removes the generated capping geometry.
     * @experimental
     * @param clipPlaneId the id of the clip plane
     */
    removeCapping(clipPlaneId: number): Promise<void>;
  }
  export type ClipPlaneProperties = {
    /**
     * List of node IDs which should be exclusively clipped.
     * The properties clippedNodes and excludedNodes are mutually exclusive.
     * @default []
     */
    clippedNodes?: number[];
    /**
     * The enabled state of the clip plane.
     * @default false
     */
    enabled?: boolean;
    /**
     * List of node IDs which should be excluded from the clipping.
     * The properties clippedNodes and excludedNodes are mutually exclusive.
     * @default []
     */
    excludedNodes?: number[];
    /**
     * The invisible state of the clip plane.
     * @default false
     */
    invisible?: boolean;
    /**
     * The name of the clip plane.
     * @default undefined
     */
    name?: string;
    /**
     * The normal vector of the clip plane.
     * @default [0, 1, 0]
     */
    normal?: [number, number, number] | Float32Array;
    /**
     * The position of the clip plane.
     * @default [0,0,0]
     */
    position?: [number, number, number] | Float32Array;
    /**
     * The tangent vector of the clip plane.
     * @default [1, 0, 0]
     */
    tangent?: [number, number, number] | Float32Array;
    /**
     * The thickness of the clip plane.
     * @default 0
     */
    thickness?: number;
    /**
     * The transformation matrix of the clip plane.
     * @default [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
     */
    transform?:
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
  };
  export type ClipRoomProperties = {
    /**
     * The enabled state of the clip room.
     * @default true
     */
    enabled?: boolean;
    /**
     * The invisible state of the clip room.
     * @default false
     */
    invisible?: boolean;
    /**
     * The name of the clip room.
     * @default undefined
     */
    name?: string;
    /**
     * The size of the clip room.
     * @default [1, 1, 1]
     */
    size?: [number, number, number] | Float32Array;
    /**
     * The transformation matrix of the clip room.
     * @default [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
     */
    transform?:
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
  };

  /**
   * Collections store groups of nodes. They can be created empty or from a list of nodes.
   * There is also the way to create a collection by searching nodes matching a given property.
   */
  export interface CollectionAPI {
    /**
     * Returns the id of a new collection containing the nodes from the given list.
     *
     * @param nodeIDlist An array of node id's from which a new node collection should be created.
     *
     * @return           The id of the newly created node collection.
     */
    createCollection(nodeIDlist?: Array<number>): number;
    removeCollection(collectionID: number): void;
    getCollection(collectionID: number): ICollection;
    /**
     * Creates a new, empty collection and returns its id.
     *
     * @return The id of the newly created collection.
     */
    createCollection(): number;
    /**
     * Finds nodes within the given BoxVolume (created using the createBoxVolume() function).
     * If includeOverlappingNodes is false, only nodes fully contained by the box volume are returned.
     * The rootNodeID specifies the node from which the subtree is searched.
     *
     * @param  selectionBox            3-dimensional search volume.
     * @param  includeOverlappingNodes Specifies whether the search result contains only those nodes which lie entirely in the search volume or if overlapping nodes are also included.
     * @param  rootNodeID              Restricts the search to a subtree of a node with the given id.
     *
     * @return                         A the id of the created collection of nodes that are fitting the given search criteria.
     */
    searchByVolume(
      selectionBox: BoxVolume,
      includeOverlappingNodes: boolean,
      rootNodeID?: number
    ): Promise<number>;
    /**
     * Adds the node given by nodeID to the collection with id collectionID. If recursive is true,
     * the descendants of the node are also added. Returns the  number of nodes in the collection.
     *
     * @param  collectionID Specifies to which collection the node should be added
     * @param  nodeID       Specifies which node should be added to the collection
     * @param  recursive    Specifies if the children of the node should also be added to the collection
     *
     */
    addToCollection(
      collectionID: number,
      nodeID: number,
      recursive?: boolean
    ): void;
    /**
     * Removes a node given by nodeID from the collection with id collectionID. If recursive is true,
     * the descendants of the node are also removed.
     *
     * @param  collectionID Specifies from which collection the node should be removed
     * @param  nodeID       Specifies which node should be removed from the collection
     * @param  recursive    Specifies whether the children of the node should be removed from the collection too
     */
    removeFromCollection(
      collectionID: number,
      nodeID: number,
      recursive?: boolean
    ): void;
    /**
     * Returns an array containing the ids of the nodes in the collection.
     * Modifying the returned array results in undefined behavior.
     *
     * @READONLY
     *
     * @param  collectionID The id of the node collection
     *
     * @return              Array of node IDs representing the node collection
     */
    getCollectionElements(collectionID: number): Promise<Array<number>>;
    /**
     * Returns the number of elements inside a collection.
     *
     * @param  collectionID The id of the collection
     *
     * @return              Number of elements in a collection.
     */
    getCollectionNodeCount(collectionID: number): Promise<number>;
  }
  export interface ICollection {
    /**
     * Removes all elements from a collection without deleting the collection itself.
     */
    clear(): void;
    /**
     * Applies a callback on all elements of a collection.
     *
     * @param callback The callback function.
     */
    forNodes(callback: (nodeID: number) => Promise<any>): Promise<any>;
    /**
     * Applies a callback on all root node elements of a collection.
     *
     * @param callback The callback function.
     */
    forRootNodes(callback: (nodeID: number) => Promise<any>): Promise<any>;
    /**
     * Creates a copy of a given collection.
     *
     * @param other A ICollection object.
     */
    copy(other: ICollection): void;
    /**
     * @return The number of elements inside a collection.
     */
    getNodeCount(): number;
  }
  export enum ContextMode {
    DEFAULT = 'default',
    LEGACY = 'legacy',
  }

  /**
   * @event WEBVIS_RESET
   */
  export class WebVisResetEvent extends WebVisEvent {
    hard: boolean;
    constructor(hard: boolean);
  }

  /**
   * The ContextAPI combines all functionality which can be applied on the WebvisContext.
   */
  export interface ContextAPI
    extends AnnotationAPI,
      ClipPlaneAPI,
      CollectionAPI,
      ContextStateAPI,
      ExplosionAPI,
      FrameAPI,
      HubAPI,
      InstanceGraphAPI,
      InteractionAPI,
      LayerFilterAPI,
      EventAPI,
      MeasurementAPI,
      DrawingAPI,
      QueryAPI,
      SelectionAPI,
      SessionAPI,
      SettingsAPI,
      SessionStorageAPI,
      UtilityAPI,
      AttachmentAPI,
      AnimationAPI,
      NodePathAPI,
      RealityAPI,
      TopologyAPI,
      VariantsAPI {
    /**
     * @return The name of the context.
     */
    getName(): string;
    /**
     * Creates a viewer element.
     *
     * @param viewerID The id of the viewer.
     * @param canvas   The canvas which is attached to the viewer.
     * @param settings ViewerSettings
     */
    createViewer(
      viewerID?: string,
      canvas?: HTMLCanvasElement,
      settings?: {
        [key in ViewerSettingStrings]?: any;
      }
    ): ViewerAPI;
    /**
     * Removes a viewer element.
     *
     * @param viewer The id of the viewer.
     */
    removeViewer(viewer: ViewerAPI): void;
    /**
     * @return An array of all viewer elements.
     */
    getViewers(): Array<ViewerAPI>;
    /**
     * @param id The id of the viewer.
     * @return The viewer element by the given id.
     */
    getViewer(id?: string): ViewerAPI;
    /**
     * @hidden
     * @param settings
     */
    initializeLegacyContext(settings: {
      [key in SettingStrings | ViewerSettingStrings]?: any;
    }): void;
  }

  /**
   * @event REQUEST_CONTEXT_MENU
   */
  export class RequestContextMenuEvent extends WebVisEvent {
    provider: any;
    menuData: ContextMenuData;
    /**
     * The RequestContextMenuEvent requests the specified viewer to display its context menu with the given content.
     * @param provider The target component that should handle the request.
     * @param menuData ContextMenuData object containing desired menu location, targetNodeID, etc.
     */
    constructor(provider: any, menuData: ContextMenuData);
  }

  /**
   * Defines the properties of a context menu.
   */
  export type ContextMenuData = {
    leftPos: number;
    topPos: number;
    targetID?: number;
    clickResult?: IClickResult;
    contents?: Array<ContextMenuEntry>;
    onCloseCallback?: () => void;
  };

  /**
   * Defines the properties of an entry of a context menu.
   */
  export type ContextMenuEntry = {
    id?: string;
    label?: string;
    description?: string;
    iconID?: string;
    condition: (nodeID: number, clickResult: IClickResult) => boolean;
    command?: (nodeID: number, clickResult: IClickResult) => void;
    highlight?: (nodeID: number, clickResult: IClickResult) => void;
    subEntries?: Array<ContextMenuEntry>;
  };
  export type ContextState =
    | 'configParsed'
    | 'sessionSetup'
    | 'preinit'
    | 'init'
    | 'resourceStateUpdated'
    | 'resourceProcessed'
    | 'renderingFinished';

  export interface ContextStateAPI {
    /**
     * Register a callback to a specific state. The callback is executed once when the state is reached.
     * If webVis is already in that state the callback is triggered immediately.
     *
     * @param  state The state for which a callback is registered
     *
     * @return       A promise which throws an error if the requested state is invalid
     *
     * The following states are allowed as target </br>
     * <code>init</code> - Is reached when webVis is fully configured and set up.<br>
     * <code>resourceStateUpdated</code> - Is reached when there is state information available for all resources (This information can also be "still transcoding").<br>
     * <code>resourceProcessed</code> - This is triggered when all resources are done transcoding.<br>
     * <code>renderingFinished</code> - This is triggered when webVis is done with rendering. So no more image changes are imminent.<br>
     */
    waitFor(state: ContextState): Promise<void>;
  }
  export enum RemoveDrawingState {
    /**
     * The removal of the Drawing was successful.
     */
    OK = 0,
    /**
     * The removal of the Drawing failed, because of an unknown Drawing id.
     */
    UNKNOWN_ID = 1,
    /**
     * The removal of the Drawing failed, because it is part of one or more Snapshots.
     */
    PART_OF_SNAPSHOT = 2,
  }

  /**
   * @event DRAWING_CHANGED
   */
  export class DrawingChangedEvent extends WebVisEvent {
    drawingId: number;
    properties: DrawingProperties;
    /**
     * This event is fired when a drawing has been changed.
     * @param drawingId The id of the Drawing.
     * @param properties Properties of the Drawing.
     */
    constructor(drawingId: number, properties: DrawingProperties);
  }

  /**
   * @event DRAWING_CREATED
   */
  export class DrawingCreatedEvent extends WebVisEvent {
    drawingId: number;
    /**
     * This event is fired when a drawing has been created.
     * @param drawingId The id of the Drawing.
     */
    constructor(drawingId: number);
  }

  /**
   * @event DRAWING_REMOVED
   */
  export class DrawingRemovedEvent extends WebVisEvent {
    drawingId: number;
    /**
     * This event is fired when a drawing has been removed.
     * @param drawingId The id of the Drawing.
     */
    constructor(drawingId: number);
  }

  /**
   * DRAWING_CREATED
   * @event INTERNAL_DRAWING_CREATED
   * @hidden
   */
  export class InternalDrawingCreatedEvent extends WebVisEvent {
    drawingId: number;
    attachmentId: number;
    properties: DrawingProperties;
    constructor(
      drawingId: number,
      attachmentId: number,
      properties: DrawingProperties
    );
  }

  /**
   * The **DrawingAPI** provides basic functionalities to interact with 2D Drawings created with
   * the help of the [[ViewerDrawingAPI]].
   */
  export interface DrawingAPI {
    /**
     * Changes one or more properties of a Drawing with the specified id.
     * @param {number} drawingId - The id of the Drawing.
     * @param {DrawingProperties} properties - The properties of the Drawing.
     * @returns {DrawingProperties} An object with the changed properties.
     */
    changeDrawing(
      drawingId: number,
      properties: DrawingProperties
    ): DrawingProperties;
    /**
     * Creates a new Drawing from the Output of the [[ViewerDrawingAPI]].
     * @param {ViewerDrawingResult} data - The data generated with the help of the [[ViewerDrawingAPI]].
     * @param {DrawingProperties} properties - Initial properties of the created Drawing.
     * @returns {number} The id of the newly created Drawing.
     */
    createDrawing(
      data: ViewerDrawingResult,
      properties?: DrawingProperties
    ): number;
    /**
     * Returns all available Drawing ids.
     * @returns {number[]} An Array of all available Drawing ids.
     */
    getDrawings(): number[];
    /**
     * Removes a Drawing with the specified id.
     * If a Drawing is part of a Snapshot the removal will fail with the State [[RemoveDrawingState.PART_OF_SNAPSHOT]]
     * @param {number} drawingId - The id of the to be removed Drawing.
     * @param {boolean} force - Forces the removal of the Drawing even if the Drawing is part of one or more Snapshots.
     * @returns {RemoveDrawingState}
     */
    removeDrawing(drawingId: number, force?: boolean): RemoveDrawingState;
    /**
     * Returns the DrawingData for the specified Drawing id.
     * @param {number} drawingId - The id of the Drawing from which the data is requested.
     * @returns {Promise<DrawingData>} The requested Drawing data.
     */
    requestDrawingData(drawingId: number): Promise<DrawingData>;
  }

  export type DrawingData = {
    /**
     * The properties of the Drawing.
     */
    properties: DrawingProperties;
    /**
     * The Data generated by the [[ViewerDrawingAPI]].
     */
    data: ViewerDrawingResult;
  };
  export type DrawingProperties = {
    /**
     * The enabled state of the Drawing.
     * @default false
     */
    enabled?: boolean | undefined;
    /**
     * The name of the Drawing.
     * @default undefined
     */
    name?: string | undefined;
  };
  export enum EventType {
    NODE_CHANGED = 0,
    NODE_ADDED = 1,
    NODE_REMOVED = 2,
    NODE_CLICKED = 3,
    NODE_POINTER_ENTER = 4,
    NODE_POINTER_OVER = 5,
    NODE_POINTER_OUT = 6,
    SNAPSHOT_CREATED = 7,
    SNAPSHOT_RESTORED = 8,
    SNAPSHOT_REMOVED = 9,
    SNAPSHOT_CHANGED = 10,
    MEASUREMENT_CREATED = 11,
    MEASUREMENT_CHANGED = 12,
    MEASUREMENT_UI_CHANGED = 13,
    MEASUREMENT_REMOVED = 14,
    CLIPPLANE_CREATED = 15,
    CLIPPLANE_CHANGED = 16,
    CLIPPLANE_REMOVED = 17,
    CLIPPING_ROOM_CREATED = 18,
    CLIPPING_ROOM_CHANGED = 19,
    ANNOTATION_CREATED = 20,
    ANNOTATION_CHANGED = 21,
    ANNOTATION_REMOVED = 22,
    SETTING_CHANGED = 23,
    VIEWER_SETTING_CHANGED = 24,
    NOTIFICATION = 26,
    ACTIVE_SCENE_VOLUME_CHANGED = 27,
    SELECTION_CHANGED = 28,
    MODEL_RENDERED = 29,
    INTERACTION_MODE_CHANGED = 31,
    LAYERFILTER_CHANGED = 32,
    LAYERFILTER_REGISTERED = 33,
    ACTIVE_ITEM = 34,
    EXPLOSION_STARTED = 35,
    EXPLOSION_CHANGED = 36,
    EXPLOSION_FINISHED = 37,
    PROGRESS_CHANGED = 42,
    VIEWER_CREATED = 43,
    VIEWER_REMOVED = 44,
    VIEWER_NAVIGATION_STARTED = 45,
    VIEWER_NAVIGATION_ENDED = 46,
    SESSION_STATE_CHANGED = 48,
    STREAM_STATE_CHANGED = 49,
    MEMBER_JOINED = 50,
    MEMBER_UPDATED = 51,
    MEMBER_LEFT = 52,
    STATE_SYNC = 53,
    SESSION_PARAMETER_CHANGED = 54,
    SESSION_TRANSFER = 57,
    BACKGROUND_CLICKED = 58,
    VIEW_CHANGED = 59,
    WEBVIS_RESET = 60,
    REQUEST_CONTEXT_MENU = 62,
    CREDENTIALS_AQUISITION_UPDATE = 65,
    VIEWPORT_CHANGED = 66,
    CUSTOM_NODE_ADDED = 67,
    CLIPPING_ROOM_REMOVED = 68,
    ANIMATION_STARTED = 69,
    ANIMATION_ITERATION = 70,
    ANIMATION_ENDED = 71,
    ANIMATION_FRAMES_CREATED = 72,
    ANIMATION_FRAMES_REMOVED = 73,
    CUSTOM_PROPERTY_REGISTERED = 74,
    ATTACHMENT_CREATED = 75,
    ATTACHMENT_DATA_CHANGED = 76,
    ATTACHMENT_REMOVED = 77,
    SNAPSHOT_RESTORE_STARTED = 78,
    LAYERFILTER_UNREGISTERED = 79,
    SNAPSHOT_CREATION_STARTED = 80,
    NODES_REMOVED = 81,
    NODES_CHANGED = 82,
    INTERNAL_SNAPSHOT_CREATED = 83,
    XR_MEMBER_ADDED = 84,
    XR_MEMBER_REMOVED = 85,
    XR_MEMBER_CAPABILITIES_CHANGED = 86,
    XR_MEMBER_MODELTRACKER_INFO_RECEIVED = 87,
    XR_MEMBER_MODELTRACKER_EDGEIMG_RECEIVED = 88,
    XR_SESSION_STATE_CHANGED = 89,
    XR_MEMBER_STATE_CHANGED = 90,
    NODE_PROPERTIES_RESET = 91,
    LOG_EVENT = 92,
    VIEWER_GIZMO_CHANGED = 93,
    DRAWING_CHANGED = 94,
    DRAWING_CREATED = 95,
    DRAWING_REMOVED = 96,
    INTERNAL_DRAWING_CREATED = 97,
    SERVICE_CONNECTION_LOST = 98,
    VARIANT_CHANGED = 99,
    REQUEST_ERROR = 100,
    VIEWER_GIZMO_MODE_CHANGED = 101,
    EVENT_TYPE_COUNT = 102,
  }

  /**
   * @event WebVisEvent
   */
  export class WebVisEvent {
    private static _eventCount;
    id: number;
    type?: EventType;
    transactionCode?: string;
    transactionID?: number;
    constructor();
  }

  /**
   * These functions allow adding and removing listeners to be able to react to events on arbitrary nodes.
   *
   * **Example**
   * ```typescript
   * // Get an instance of the ContextAPI
   * const myContext : ContextAPI = webvis.getContext( "example" )
   *
   * // Listen for newly added nodes
   * myContext.registerListener( [myContext.EventType.NODE_ADDED], (event) => {
   *
   * // Prints the nodeID of the added node.
   * console.log(event.targetNodeID);
   * });
   *
   * ```
   */
  export interface EventAPI {
    /**
     * Registers the <code>listener</code> to the node with the matching <code>nodeID</code> and returns
     * the id of the listener. The <code>observeSubTree</code> flag allows to observe the whole subtree under the
     * respective node with the <code>listener</code>. With the <code>eventTypes</code> array, you can specify the
     * types of events the listener should be reacting on. If an empty array is passed, the listener will react on
     * all event types.
     *
     * @param eventTypes     The kind of events on which the event listener should listen.
     * @param listener       The event listener.
     * @param nodeID         The id of the node on which the event listener should be registered.
     * @param observeSubTree Indicates whether the event listener should also listen to events in all child nodes. This has an effect on **NODE_*** events only.
     *
     * @return               The id of the event listener.
     */
    registerListener<T extends WebVisEvent = WebVisEvent>(
      eventTypes: Array<EventType>,
      listener: IEventListener<T>,
      nodeID?: number,
      observeSubTree?: boolean
    ): number;
    /**
     * Removes the listener for the given <code>listenerID</code>.
     *
     * @param listenerID The id of the event listener that should be unregistered.
     */
    unregisterListener(listenerID: number): void;
  }

  export interface IEventListener<T extends WebVisEvent = WebVisEvent> {
    (event: T): void;
  }

  /**
   * EXPLOSION_CHANGED
   * @event EXPLOSION_CHANGED
   */
  export class ExplosionChangedEvent extends WebVisEvent {
    explosionFactor: number;
    /**
     * The ExplosionChangedEvent occurs if an Explosion has been changed.
     * @param {number} explosionFactor - Determines how wide-spread the Explosion is.
     */
    constructor(explosionFactor: number);
  }

  /**
   * EXPLOSION_FINISHED
   * @event EXPLOSION_FINISHED
   */
  export class ExplosionFinishedEvent extends WebVisEvent {
    /**
     * The ExplosionFinishedEvent occurs if an Explosion has been finished.
     */
    constructor();
  }

  /**
   * @event EXPLOSION_STARTED
   */
  export class ExplosionStartedEvent extends WebVisEvent {
    center: Float32Array;
    /**
     * The ExplosionStartedEvent occurs if an Explosion has been started.
     * @param {number} center - The center around which the parts are exploded.
     */
    constructor(center: Float32Array);
  }
  /**
   * The **ExplosionAPI** provides a very basic explosion, which moves the parts away from a given point.
   * The Explosion is completely circular. Overlapping parts are possible.
   *
   * **Example**
   * ```typescript
   * // Get an instance of the ContextAPI
   * const myContext : ContextAPI = webvis.getContext( "example" )
   * const nodeID : number = myContext.add("someModelURL");
   *
   * // Create a simple Explosion from the center of the node's BoxVolume.
   * myContext.createExplosion(nodeID);
   *
   * // Perform the Explosion. All parts are moved away 0.3 times their distance to the center of the node.
   * myContext.performExplosion(0.3);
   *
   * // Reset all transformations.
   * myContext.endExplosion();
   * ```
   *
   * **Restrictions**
   *
   * Explosions cannot be performed on monolithic models.
   */
  export interface ExplosionAPI {
    /**
     * Creates an Explosion (around a given point).
     * @param centerNodeID The nodeID of the node around which center the explosion is created.
     */
    createExplosion(centerNodeID?: number): void;
    /**
     * Performs the actual Explosion.
     * @param explosionFactor The value by which the parts are expanded.
     */
    performExplosion(explosionFactor: number): void;
    /**
     * Restores the initial transformations of all exploded parts.
     */
    endExplosion(): void;
  }

  /**
   * The [[FrameAPI]] provides functionalities to register and unregister custom callback functions which are executed on every run of the [[ContextAPI]] internal update loop.
   *
   * **Example**
   * ```typescript
   * // Create an instance of the ContextAPI
   * const myContext : ContextAPI = webvis.createContext( "example" )
   *
   * // Define your frame listener
   * const myFrameListener : FrameListener = ( time : number, elapsed : number ) =>
   * {
   *     console.log(`Current time ${time} ms. Time since last call ${elapsed} ms.`);
   * };
   *
   * // Register your frame listener
   * myContext.registerFrameListener( myFrameListener );
   *
   * // Unregister your frame listener
   * myContext.registerFrameListener( myFrameListener );
   * ```
   */
  export interface FrameAPI {
    /**
     * Registers a listener function which get called once per internal update tick.
     * @param {FrameListener} listener - The listener to register.
     */
    registerFrameListener(listener: FrameListener): void;
    /**
     * Unregisters a previously registered listener via [[registerFrameListener]].
     * @param {FrameListener} listener - The listener to unregister.
     */
    unregisterFrameListener(listener: FrameListener): void;
  }
  /**
   * Callback function which can be registered via the [[FrameAPI]].
   * @param {number} time - Total time in milliseconds since the start of the internal update loop.
   * @param {number} elapsed - Elapsed time since the last run of the internal update loop.
   */
  export type FrameListener = (time: number, elapsed: number) => void;

  /**
   * @event SERVICE_CONNECTION_LOST
   */
  export class ServiceConnectionLostEvent extends WebVisEvent {
    service: string;
    status: number;
    /**
     * This event occurs if the connection to a service has been lost.
     * @param service The name of the service.
     * @param status The status code of the connection.
     */
    constructor(service: string, status: number);
  }

  export interface HubAPI {
    /**
     * @return All supported data formats.
     */
    requestSupportedContentTypes(): Promise<Array<ContentType>>;
    /**
     * @return All supported render setups.
     */
    requestSupportedRenderSetups(): Promise<
      Array<{
        name: string;
        value: string;
      }>
    >;
  }
  export type ContentType = {
    /**
     * Homepage for more information on a contentType.
     */
    home?: string;
    id: string;
    isExperimental?: boolean;
    /**
     * The full name of a contentType.
     */
    label: string;
    /**
     * The mimeTypes of a contentType.
     */
    mimeTypes?: Array<string>;
    spec?: string;
    /**
     * Supported suffixes of a contentType.
     */
    suffixes?: Array<string>;
    version?: string;
  };
  export type UserFeedback = {
    rating: number;
    message: string;
  };
  /**
   * Defines the strategy which is used when a data cache is requested from the Hub.
   */
  export enum CacheStrategy {
    /**
     * Reuses previously generated cache results if available.
     */
    REUSE = 0,
    /**
     * Ignores previously generated cache results and forces the cache regeneration for the input data.
     */
    REGENERATE = 1,
    /**
     * Ignores previously generated cache results and forces the cache regeneration for the input data and linked data below.
     */
    REGENERATE_RECURSIVE = 2,
  }
  /**
   * Describes, if a node is part of a ColorComparison and if yes, in which group.
   */
  export enum ComparisonGroup {
    NONE = 0,
    A = 1,
    B = 2,
  }
  /**
   * Describes, if a node is (partially) enabled.
   */
  export enum EnabledState {
    Disabled = 0,
    Enabled = 1,
    Partial = 2,
  }
  /**
   * Describes, if the info state of a Node.
   */
  export enum NodeInfoState {
    DEFAULT = 0,
    MISSING_DATA = 4,
    MISSING_DATA_IN_SUBTREE = 8,
    WARNINGS = 10,
    ERRORS = 5,
  }
  /**
   * Describes, if the representation of a Node.
   */
  export enum NodeRepresentation {
    PART = 1,
    LINKED_PART = 2,
    ASSEMBLY = 4,
    EMPTY_PART = 8,
    COLLAPSED_ASSEMBLY = 16,
    EXPANDED_ASSEMBLY = 64,
    LOADING = 128,
  }
  /**
   * Describes the resource state the node is in.
   */
  export enum NodeResourceState {
    INIT = 0,
    REQUESTED = 1,
    LOADING = 2,
    UNKNOWN_ERROR = 3,
    CACHE_DATA_ERROR = 4,
    CACHE_REF_ERROR = 5,
    CACHE_AUTH_ERROR = 6,
    NETWORK_ERROR = 7,
    LICENSE_ERROR = 8,
    WAITING = 9,
    READY = 10,
    EMPTY = 11,
    UNLOADED = 13,
    CACHE_DEPENDENCY_ERROR = 14,
    UNREACHABLE = 15,
    NUM_CLIENT_RESOURCE_STATES = 16,
  }
  /**
   * Describes the type of the Node.
   */
  export enum NodeType {
    NONE = 0,
    STRUCTURE = 1,
    AUX = 2,
    CUSTOM = 4,
    ALL = 7,
    COLLECTION = 8,
    MODELVIEW = 18,
    CLIPPLANE = 34,
    CLIPROOM = 66,
    MARKER = 130,
    TEXT = 258,
    DIMENSION = 514,
    ANNOTATION = 1026,
  }
  /**
   * The properties a Node can have.
   */
  export enum Property {
    ACTIVATABLE = 'activatable',
    ANIMATION = 'animation',
    APPEARANCE_URI = 'appearanceURI',
    ATTACHMENT = 'attachment',
    AUX_CONTENT = 'auxContent',
    AUX_ENABLED = 'auxEnabled',
    AUX_NODES = 'auxNodes',
    CHILDREN = 'children',
    COMPARISON_GROUP = 'comparisonGroup',
    DEPTH = 'depth',
    ENABLED = 'enabled',
    GLOBAL_TRANSFORM = 'globalTransform',
    GLOBAL_VOLUME = 'globalVolume',
    HAS_AUX_STRUCTURE = 'hasAuxStructure',
    HAS_VARIANTS = 'hasVariants',
    HIDDEN = 'hidden',
    INFO_STATE = 'infoState',
    LABEL = 'label',
    LOCAL_TRANSFORM = 'localTransform',
    LOCAL_VOLUME = 'localVolume',
    MODEL_VIEWS = 'modelViews',
    NAMES = 'names',
    NODE_REPRESENTATION = 'nodeRepresentation',
    PARENT = 'parent',
    PICKABLE = 'pickable',
    REAL = 'real',
    REAL_OCCLUDER = 'realOccluder',
    RENDER_MODE = 'renderMode',
    RESOURCE_STATE = 'resourceState',
    SELECTED = 'selected',
    SUBTYPE = 'subType',
    TYPE = 'type',
  }
  /**
   * The possible Render Modes.
   */
  export enum RenderMode {
    Faces = 0,
    Topology = 1,
    FacesTopology = 2,
    Occluder = 3,
    OccluderTopology = 4,
  }
  export type UsageString = 'open' | 'closed' | 'auto';

  /**
   * @event ACTIVE_SCENE_VOLUME_CHANGED
   */
  export class ActiveSceneVolumeChangedEvent extends WebVisEvent {
    volume: BoxVolume;
    /**
     * The ACTIVE_SCENE_VOLUME_CHANGED event occurs if the active scene volume has been changed.
     * @param volume        The new active scene volume
     */
    constructor(volume: BoxVolume);
  }

  /**
   * @event CUSTOM_NODE_ADDED
   */
  export class CustomNodeAddedEvent extends WebVisEvent {
    targetNodeID: number;
    customType: string;
    attachmentID: number;
    /**
     * The CUSTOM_NODE_ADDED event occurs if a custom Node has been added.
     * @param targetNodeID    The ID of the target Node.
     * @param customType      The custom type of the target Node.
     * @param attachmentID    The ID of the attachment.
     */
    constructor(targetNodeID: number, customType: string, attachmentID: number);
  }

  /**
   * CUSTOM_PROPERTY_REGISTERED
   * @event CUSTOM_PROPERTY_REGISTERED
   */
  export class CustomPropertyRegisteredEvent extends WebVisEvent {
    customPropName: string;
    recursive: boolean;
    defaultValue: any;
    /**
     * This event signals a that a custom Property has been registered.
     * @param {string} customPropName The name of the custom Property
     * @param {boolean} recursive The recursive state of the new custom Property
     * @param {any} defaultValue specifies the Property default value
     */
    constructor(customPropName: string, recursive: boolean, defaultValue: any);
  }

  /**
   * @event NODE_ADDED
   */
  export class NodeAddedEvent extends WebVisEvent {
    targetNodeID: number;
    parentNodeID: number;
    nodeType: NodeType;
    dataUri: string;
    targetNodeDepth: number;
    label: string;
    properties?: {
      [key: string]: any;
    };
    usage?: UsageString;
    subType?: string;
    contentType?: string;
    /**
     * The NODE_ADDED event occurs if a Node has been added.
     * @param targetNodeID      The ID of the target Node.
     * @param parentNodeID      The ID of the parent Node.
     * @param dataUri           The data URI of the target Node.
     * @param targetNodeDepth   The depth of the target Node.
     * @param label             The label of the target Node.
     * @param properties        A map of all properties on the Node.
     * @param usage             The usage of the target Node.
     */
    constructor(
      targetNodeID: number,
      parentNodeID: number,
      nodeType: NodeType,
      dataUri: string,
      targetNodeDepth: number,
      label: string,
      properties?: {
        [key: string]: any;
      },
      usage?: UsageString,
      subType?: string,
      contentType?: string
    );
  }

  /**
   * @event NODE_CHANGED
   */
  export class NodeChangedEvent extends WebVisEvent {
    targetNodeID: number;
    changeList: {
      [key: string]: any;
    };
    transactionID?: number;
    /**
     * The NODE_CHANGED event occurs if a Node has been changed.
     * @param targetNodeID  The ID of the target Node.
     * @param changeList    A list of all changes.
     * @param transactionID The transaction ID of the event
     */
    constructor(
      targetNodeID: number,
      changeList: {
        [key: string]: any;
      },
      transactionID?: number
    );
  }

  /**
   * NODE_PROPERTIES_RESET
   * @event NODE_PROPERTIES_RESET
   */
  export class NodePropertiesResetEvent extends WebVisEvent {
    targetNodeID: number;
    properties: Array<string>;
    /**
     * The NODE_PROPERTIES_RESET event occurs if one or more properties of the Node has been reset.
     * @param targetNodeID      The ID of the target Node.
     * @param properties        The properties which has been reset.
     */
    constructor(targetNodeID: number, properties: Array<string>);
  }

  /**
   * NODE_REMOVED
   * @event NODE_REMOVED
   */
  export class NodeRemovedEvent extends WebVisEvent {
    targetNodeID: number;
    parentNodeID: number;
    /**
     * The NODE_REMOVED event occurs if a Node has been removed.
     * @param targetNodeID      The ID of the target Node.
     * @param parentNodeID      The ID of the parent Node.
     */
    constructor(targetNodeID: number, parentNodeID: number);
  }

  /**
   * NODES_CHANGED
   * @event NODES_CHANGED
   */
  export class NodesChangedEvent extends WebVisEvent {
    targetNodeIDs: Array<number>;
    propertyName: string;
    propertyValue: any;
    /**
     * The NODES_CHANGED event occurs if multiple Nodes have been changed.
     * @param targetNodeIDs The IDs of the changed Nodes.
     * @param propertyName  The name of the changed Property.
     * @param propertyValue The new value of the Property.
     */
    constructor(
      targetNodeIDs: Array<number>,
      propertyName: string,
      propertyValue: any
    );
  }

  /**
   * NODES_REMOVED
   * @event NODES_REMOVED
   */
  export class NodesRemovedEvent extends WebVisEvent {
    targetNodeIDs: Array<number>;
    /**
     * The NODES_REMOVED event occurs if one or more of the Nodes have been removed.
     * @param targetNodeIDs      The IDs of the target Nodes.
     */
    constructor(targetNodeIDs: Array<number>);
  }
  /**
   * This interfaces provides functions for working with BoxVolumes.
   * BoxVolumes are Axis Aligned Bounding Boxes (AABB) and describe the minimal Bounding Box of a Node.
   * They consist of six values, 3 for the minimum and 3 for the maximum corner.
   */
  export interface BoxVolume {
    /**
     * Returns true, if the BoxVolume is valid.
     */
    isValid(): boolean;
    setValid(valid?: boolean): void;
    /**
     * Creates a BoxVolume from an array.
     * @param array the number array with 6 values
     */
    fromArray(array: Float32Array | Array<number>): boolean;
    reset(): void;
    setFromCenterSize(
      center: [number, number, number] | Float32Array,
      size: [number, number, number] | Float32Array
    ): BoxVolume;
    setMin(min: [number, number, number] | Float32Array): void;
    setMax(max: [number, number, number] | Float32Array): void;
    includePoint(p: Float32Array): void;
    extend(
      newMin: [number, number, number] | Float32Array,
      newMax: [number, number, number] | Float32Array
    ): void;
    /**
     * Extends a BoxVolume by another BoxVolume.
     * The resulting BoxVolume will span over the other BoxVolume too.
     * @param array another BoxVolume
     */
    extendByVolume(other: BoxVolume): void;
    extendByTransformedVolume(
      other: BoxVolume,
      transform?:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array
    ): void;
    /**
     * Returns the minimum of the BoxVolume.
     */
    getMin(): Float32Array;
    /**
     * Returns the maximum of the BoxVolume.
     */
    getMax(): Float32Array;
    /**
     * Returns the center of the BoxVolume.
     */
    getCenter(): Float32Array;
    /**
     * Returns the size of the BoxVolume.
     */
    getSize(): Float32Array;
    getRadialVec(): Float32Array;
    getDiameter(): number;
    copy(other: BoxVolume): void;
    transformFrom(
      matrix:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array,
      other: BoxVolume
    ): BoxVolume;
    transformFromArray(
      matrix:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array,
      otherVolume: number[]
    ): BoxVolume;
    /**
     * Returns true if two BoxVolumes are overlapping.
     */
    overlaps(other: BoxVolume): boolean;
    /**
     * Returns true if the given BoxVolume contains the other BoxVolume.
     * @param other the other BoxVolume
     */
    contains(other: BoxVolume): boolean;
    /**
     * Returns true if the given BoxVolume equals the other BoxVolume.
     * @param other the other BoxVolume
     */
    equals(other: BoxVolume): boolean;
    /**
     * Returns the corner points of a BoxVolume.
     */
    getCornerPoints(): Array<Float32Array>;
  }

  /**
   * With the InstanceGraphAPI the content of webvis can be controlled and manipulated. It resembles a scene graph
   * like tree structure of Nodes. Every Node can contain links to 3D geometry and/or group other Nodes.
   * <br>
   *
   * The get- and set-Property functions allow setting and retrieving properties of arbitrary type on the Nodes.
   * Properties are used to modify any Node dependent data like color, local transformation, etc. There is a set of
   * predefined Node properties that webvis will react on, but the surrounding application might add
   * any other property to the Nodes.
   */
  export interface InstanceGraphAPI {
    /**
     * Loads the resource behind the given dataURI and returns the id of the new contents root Node.
     *
     * @param  dataURI     Specifies the URI of the data resource.
     * @param  parentID    By specifying a parentID the resource can be added to an arbitrary Node instead of the tree root.
     * @param  {UsageString} usage       The usage parameter allows to define how the resource should be inserted in the InstanceGraph.
     * @param  label       The label can be used to set a string that is shown in the UI as a name of the Node.
     * @param  contentType With contentType the type of the input data can be specified with a MimeType or any other descriptor.
     * @param  initialProperties A map of properties to initialize the new Node.
     * @param  {CacheStrategy} [cacheStrategy=CacheStrategy.REUSE] Defines the strategy which is used when a data cache is requested from the Hub.
     *
     * @return             The id of the new contents root Node
     */
    add(
      dataURI: string,
      parentID?: number,
      usage?: UsageString,
      label?: string,
      contentType?: string,
      initialProperties?: {
        [key: string]: any;
      },
      cacheStrategy?: CacheStrategy
    ): number;
    /**
     * Variant of the add function, accepting a params object instead of explicit parameters. The params object is a
     * map from parameter names to parameter values.
     * @param params                            The params object.
     * @param {string} params.dataURI           Specifies the URI of the data resource.
     * @param {number} params.parentID          By specifying a parentID the resource can be added to an arbitrary Node instead of the tree root.
     * @param {UsageString} params.usage        The usage parameter allows to define how the resource should be inserted in the InstanceGraph as described in the next table.
     * @param {string} params.label             label can be used to set a string that is shown in the UI as a name of the Node.
     * @param {string} params.contentType       With contentType the type of the input data can be specified with a MimeType or any other descriptor.
     * @param {object} params.initialProperties A map of properties to initialize the new Node.
     * @param {CacheStrategy} params.cacheStrategy Defines the strategy which is used when a data cache is requested from the Hub.
     */
    add(params: { [key: string]: any }): number;
    /**
     * Creates a custom Node with custom data which is stored in an Attachment.
     *
     * @param  customNodeType {string}          Specifies the custom Node type.
     * @param  data {any}                       Specifies the data of the custom Node.
     * @param  dataType {AttachmentType="json"} Specifies the type of the data.
     */
    addCustomNode(
      customNodeType: string,
      data: any,
      dataType?: AttachmentType
    ): number;
    /**
     * Removes the Node for the given nodeID from the InstanceGraph. If no nodeID is supplied all Nodes are deleted.
     *
     * @param nodeID The id of the Node that should be removed.
     */
    remove(nodeID?: number | Array<number>): Promise<void>;
    /**
     * Sets the property named <i>property</i> to <i>value</i>  on the Node with id <i>nodeID</i>.
     *
     * @param nodeID    The id of the Node whose property has to be set.
     * @param property  The name of the property that has to be set.
     * @param value     The new value of the specified property.
     * @param silent    The silent flag indicates that no NODE_CHANGED event is fired.
     */
    setProperty<T extends Property | string>(
      nodeID: number | Array<number>,
      property: T,
      value: PropertyType<T>,
      silent?: boolean
    ): Promise<SetPropertyResults>;
    /**
     * Returns the value of the property on the Node with the matching id.
     *
     * @param nodeID   The id of the Node whose property should be read.
     * @param property The name of the property whose value should be read.
     *
     * @return         The retrieved value of the Node property.
     */
    getProperty<T extends Property | string>(
      nodeID: number,
      property: T
    ): Promise<PropertyType<T>>;
    /**
     * Returns the values of the properties on the Node with the matching id.
     *
     * @param nodeID   The id of the Node whose properties should be read.
     * @param properties The names of the properties whose value should be read.
     *
     * @return         The retrieved values of the Node's properties.
     */
    getProperties<T extends Property | string>(
      nodeID: number,
      properties: Array<T>
    ): Promise<Array<PropertyType<T>>>;
    /**
     * Returns the full volume of currently loaded scene.
     * @returns {Promise<BoxVolume>} - The full volume of currently loaded scene.
     */
    requestFullSceneVolume(): Promise<BoxVolume>;
    /**
     * Returns the active volume of currently loaded scene.
     * @returns {Promise<BoxVolume>} The active volume of currently loaded scene.
     */
    requestActiveSceneVolume(): Promise<BoxVolume>;
    /**
     * Resets the value of the property on the Node with the matching id.
     *
     * @param nodeID   The id of the Node whose property should be reset.
     * @param property Property which should be reset.
     */
    resetProperty<T extends Property | string>(
      nodeID: number,
      property: T
    ): Promise<void>;
    /**
     * Resets the value of the specified properties on the given Node.
     *
     * @param nodeID     The id of the Node whose property should be reset.
     * @param properties List of properties which should be reset.
     */
    resetProperties<T extends Property | string>(
      nodeID: number,
      properties: Array<T>
    ): Promise<void>;
    /**
     * Traverses the subtree of a given nodeID and collects all statistics (currently only available for AUX-Nodes).
     *
     * @param {NodeType} [nodeType=NodeType.ALL] Specifies the target Node type.
     * @param {number} [nodeID=0] Specifies the entry point of the subtree traversal (default: 0).
     * @return {Promise<any>} An Object of Type/Count pairs.
     */
    getStatistics(nodeType?: NodeType, nodeID?: number): Promise<any>;
    /**
     * Returns a JSON object containing the metadata for the given nodeID.
     *
     * @param  nodeID The id of a Node.
     *
     * @return A JSON object containing the requested metadata.
     */
    getMetadata(nodeID: number): Promise<{
      [key: string]: string;
    }>;
    /**
     * Registering a new custom property.
     *
     * @param {string} name The name of the new property.
     * @param {any} defaultValue Specifies the default value.
     * @param {boolean} recursive Defines whether the property is recursive.
     */
    registerCustomProperty(
      name: string,
      defaultValue: any,
      recursive?: boolean
    ): void;
    /**
     * Returns a list of all existing aux root Node ids below the specified subtree.
     * @param {number} [scopeNodeId=0] - Specifies the top one Node id of the subtree to be searched.
     * @returns A list of aux root Node ids.
     */
    requestAuxRootNodeIds(scopeNodeId?: number): Promise<Array<number>>;
    /**
     * Returns the L3D information of the specified Node.
     * @param {number} targetNodeId - Specifies the target Node id.
     * @returns The L3D information of the specified Node
     */
    requestL3DInformation(targetNodeId: number): Promise<any>;
    /**
     * Returns a list of all existing root Node ids below the specified subtree.
     * @param {number} [scopeNodeId=0] - Specifies the top one Node id of the subtree to be searched.
     * @param {boolean} [recursive=false] - Specifies if the subtree is traversed recursively.
     * @returns A list of root Node ids.
     */
    requestRootNodeIds(
      scopeNodeId?: number,
      recursive?: boolean
    ): Promise<Array<number>>;
    /**
     * Returns a list of all existing runtime Node ids of a specified type.
     *
     * @param {NodeType} nodeType - The Node type to collect.
     * @param {string} [subType=undefined] - The sub type to collect. Only used for Custom-Nodes.
     * @returns {Array<number>} A list of runtime Node ids of the specified type.
     */
    collectRuntimeNodesOfType(
      nodeType: NodeType,
      subType?: string
    ): Array<number>;
    setParent(nodeID: number, newParentID: number): void;
    /**
     *
     * @return {boolean}  Returns true if a Node is deletable.
     */
    isNodeDeletable(nodeID: number): boolean;
    /**
     *
     * @return {boolean} Checks the Node's type for the given Node id.
     */
    isNodeType(nodeID: number, nodeType: NodeType): boolean;
    /**
     * Inverts all enabled states.
     */
    invertEnabledStates(): void;
    /**
     * Returns a List of all Node ids which are included or overlapped by the specified 3D world space Bounding Volume.
     * @param {BoxVolume} boxVolume - Specifies the 3D world space Bounding Volume.
     * @param {boolean} [includeOverlappingNodes=false] - Specifies that the result should include Nodes which overlap the specified 3D world space Bounding Volume as well.
     * @param {boolean} [includeDisabledNodes=false] - Specifies that the result should include Nodes which are disabled as well.
     * @param {boolean} [forceExpand=false] -
     * @param {number}  [scopeNodeId=0] - Specifies the top one Node id of the subtree to be searched.
     * @returns {Promise<number[]>} List of all NodeIds which are included or overlapped by the specified 3D world space Bounding Volume.
     */
    requestNodeIdsByBoxVolume(
      boxVolume: BoxVolume,
      includeOverlappingNodes?: boolean,
      includeDisabledNodes?: boolean,
      forceExpand?: boolean,
      scopeNodeId?: number
    ): Promise<number[]>;
    /**
     * @deprecated This function will no longer be available in future webvis releases
     *
     * Traverses the subtree of a given nodeID and collects all enabled aux Nodes.
     *
     * @param {number} [nodeID=0] Specifies the entry point of the subtree traversal (default: 0)
     * @return {Promise<Array<number>>} An Array of all enabled aux Node id's
     */
    getEnabledAuxNodes(nodeID: number): Promise<Array<number>>;
    /**
     * Returns the id of the root Node for the given Node or Topology Element.
     * @param {number | TopologyHandle} target - Specifies a Node or Topology Element
     * @return {number} - The id of the root Node for the given Node or Topology Element.
     */
    getRootNodeId(target: number | TopologyHandle): number | undefined;
  }

  /**
   * The available property types.
   */
  export type PropertyType<T> = T extends 'activatable'
    ? boolean
    : T extends 'animation'
    ? {
        name: string;
      } & AnimationOptions
    : T extends 'appearanceURI'
    ? string | number | undefined | null
    : T extends 'attachment'
    ? any
    : T extends 'auxContent'
    ? any
    : T extends 'auxEnabled'
    ? EnabledState | boolean
    : T extends 'auxNodes'
    ? number[]
    : T extends 'children'
    ? number[]
    : T extends 'comparisonGroup'
    ? ComparisonGroup
    : T extends 'depth'
    ? number
    : T extends 'enabled'
    ? EnabledState | boolean
    : T extends 'globalTransform'
    ?
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array
    : T extends 'globalVolume'
    ? BoxVolume
    : T extends 'hasAuxStructure'
    ? boolean
    : T extends 'hidden'
    ? boolean
    : T extends 'infoState'
    ? NodeInfoState
    : T extends 'label'
    ? string
    : T extends 'localTransform'
    ?
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array
    : T extends 'localVolume'
    ? BoxVolume
    : T extends 'modelViews'
    ? number[]
    : T extends 'names'
    ? string[]
    : T extends 'nodeRepresentation'
    ? NodeRepresentation
    : T extends 'parent'
    ? number
    : T extends 'pickable'
    ? boolean
    : T extends 'real'
    ? EnabledState | boolean
    : T extends 'realOccluder'
    ? boolean
    : T extends 'renderMode'
    ? RenderMode
    : T extends 'resourceState'
    ? NodeResourceState
    : T extends 'selected'
    ? boolean
    : T extends 'subType'
    ? string
    : T extends 'type'
    ? NodeType
    : any;

  export type SetPropertyResults = {
    results: Array<SetPropertyResult>;
    hasChanged: boolean;
  };
  export type SetPropertyResult = {
    nodeID: number;
    property: Property | string;
    oldValue: PropertyType<any>;
    newValue: PropertyType<any>;
    hasChanged: boolean;
  };
  /**
   * The **InteractionMode** Enumerations holds all available predefined interaction modes.
   */
  export enum InteractionMode {
    /**
     * Mode to perform a rectangular selection.
     */
    AREA_SELECTION = 0,
    /**
     * Mode to perform a rectangular zoom.
     */
    AREA_ZOOM = 1,
    /**
     * Mode to identify relations between PMI's and Faces.
     */
    AUX = 2,
    /**
     * Mode to create clip planes from geometrical features.
     */
    CLIP_PLANE = 3,
    /**
     * Mode to compare two nodes.
     */
    COLOR_COMPARISON = 4,
    /**
     *
     */
    DEFAULT = 5,
    /**
     * Mode to perform a explosion.
     */
    EXPLOSION = 6,
    /**
     * Mode to perform an arc measurement based on three points on a geometry.
     */
    MEASUREMENT_ARC = 7,
    /**
     * Mode to perform a double measurement between two geometrical features.
     */
    MEASUREMENT_DOUBLE = 8,
    /**
     * Mode to perform a single measurement on a geometry.
     */
    MEASUREMENT_SINGLE = 9,
    /**
     * Mode to disable all interaction.
     */
    NONE = 10,
    /**
     * Mode to draw on geometries.
     */
    PAINT = 11,
    /**
     * Mode to transform nodes.
     */
    TRANSFORMATION = 12,
  }
  export enum InteractionModifier {
    DEFAULT = 0,
    ADD = 1,
    EXPAND = 2,
    SECONDARY = 3,
  }
  /**
   * The available InteractionProgress states.
   */
  export enum InteractionProgress {
    WAITING_FIRST_INPUT = 0,
    WAITING_SECOND_INPUT = 1,
    WAITING_THIRD_INPUT = 2,
    DONE = 3,
  }
  /**
   * The available interaction types.
   */
  export enum InteractionType {
    PICKING = 0,
    BY_ID = 1,
  }

  /**
   * INTERACTION_MODE_CHANGED
   * @event INTERACTION_MODE_CHANGED
   */
  export class InteractionModeChangedEvent extends WebVisEvent {
    mode: InteractionMode;
    keepColorCompareActive: boolean;
    /**
     * This event signals that the interaction mode has been changed.
     *
     * @param {InteractionMode} mode - The new active interaction mode.
     * @param {boolean} keepColorCompareActive - Indicates if the color comparison mode should stay active.
     */
    constructor(mode: InteractionMode, keepColorCompareActive: boolean);
  }

  /**
   * The **InteractionAPI** provides functionalities to control the current interaction behavior by
   * switching between different predefined interaction modes.
   *
   * **Example**
   * ```typescript *
   * // Activate the predefined mode to perform a double measurement.
   * myContext.setInteractionMode(webvis.InteractionMode.MEASUREMENT_DOUBLE);
   *
   * // Leave the double measurement mode and switch back to the default interaction behaviour.
   * myContext.setInteractionMode(webvis.InteractionMode.DEFAULT);
   * ```
   */
  export interface InteractionAPI {
    /**
     * Set the current interaction mode.
     *
     * @deprecated Calling setInteractionMode with the mode parameter of type string or string[] is deprecated, please use the InteractionMode enum instead.
     * @param {string | string[]} mode - Specifies the interaction mode you want set.
     * @param {boolean} [keepColorCompareActive=false] - Specifies if the color comparison mode should stay active. (Default: false)
     */
    setInteractionMode(
      mode: string | Array<string>,
      keepColorCompareActive?: boolean
    ): void;
    /**
     * Set the current interaction mode.
     *
     * @param {InteractionMode} mode - Specifies the interaction mode you want set.
     * @param {boolean} [keepColorCompareActive=false] - Specifies if the color comparison mode should stay active. (Default: false)
     */
    setInteractionMode(
      mode: InteractionMode,
      keepColorCompareActive?: boolean
    ): void;
    /**
     * Returns the current Interaction mode.
     *
     * @returns {InteractionMode} The current Interaction mode.
     */
    getInteractionMode(): InteractionMode;
    /**
     * Checks if the color comparison mode is active.
     *
     * @returns {boolean} true if the color comparison mode is active, otherwise false.
     */
    isColorComparisonActive(): boolean;
    /**
     * Triggers an interaction on the current active interaction mode.
     *
     * @param {InteractionData} interactionData - Definition of the triggered Interaction.
     */
    processInteractionInput(interactionData: InteractionData): void;
    /**
     * Sets the current interaction mode back to the Default mode.
     *
     * @param {boolean} [keepColorCompareActive=false] - Specifies if the color comparison mode should stay active. (Default: false)
     */
    resetInteractionMode(keepColorCompareActive?: boolean): void;
  }

  /**
   * The interaction data.
   */
  export type InteractionData = {
    targetID: number;
    type?: InteractionType;
    targetName?: string;
    clickResult?: IClickResult;
    modifier?: InteractionModifier;
    originalEvent?: Event;
    origin?: any;
    color?: Float32Array;
    viewer?: ViewerAPI;
  };

  /**
   * @event LAYERFILTER_CHANGED
   */
  export class LayerFilterChangedEvent extends WebVisEvent {
    name: string;
    enabled: boolean;
    /**
     * The LAYERFILTER_CHANGED event occurs if a layer filter has been changed.
     * @param name        The name of the changed LayerFilter.
     * @param enabled     The new enabled state of the changed LayerFilter.
     */
    constructor(name: string, enabled: boolean);
  }

  /**
   * @event LAYERFILTER_REGISTERED
   */
  export class LayerFilterRegisteredEvent extends WebVisEvent {
    name: string;
    enabled: boolean;
    /**
     * The LAYERFILTER_REGISTERED event occurs if a new layer filter has been registered.
     * @param {string} name The name of the registered LayerFilter.
     * @parame enabled The enabled state of the new LayerFilter.
     */
    constructor(name: string, enabled: boolean);
  }

  /**
   * @event LAYERFILTER_UNREGISTERED
   */
  export class LayerFilterUnregisteredEvent extends WebVisEvent {
    name: string;
    /**
     * The LAYERFILTER_UNREGISTERED event occurs if a LayerFilter has been unregistered.
     * @param {string} name The name of the unregistered LayerFilter.
     */
    constructor(name: string);
  }

  /**
   * The LayerFilterAPI is used to manage the visualization of Layers.
   * These are additional metadata information from input data and are not always provided.
   */
  export interface LayerFilterAPI {
    /**
     * Returns the currently defined list of LayerFilters.
     *
     * @return Returns the registered LayerFilters and their states.
     */
    getRegisteredLayerFilters(): {
      [key: string]: boolean;
    };
    /**
     * Returns the currently defined list of enabled LayerFilters.
     *
     * @return An array of strings representing the names of the enabled LayerFilters.
     */
    getEnabledLayerFilters(): Array<string>;
    /**
     * Sets layers to enabled whose names are in the array of names.
     *
     * @param name The name of the LayerFilter
     * @param enabled The new enabled state.
     */
    setLayerFilterEnabled(
      name: string,
      enabled: boolean
    ): SetLayerFilterEnabledResult;
    /**
     * Returns true if the specified nodeID is part of an enabled Layer.
     *
     * @param nodeID The nodeID which should be checked.
     */
    isNodePartOfEnabledLayers(nodeID: number): Promise<boolean>;
  }
  /**
   * The result of enabling or disabling a LayerFilter.
   */
  export type SetLayerFilterEnabledResult = {
    layerFilterName: string;
    value: boolean;
    hasChanged: boolean;
  };
  /**
   * The available LogLevels.
   */
  export enum LogLevel {
    SILENT = 0,
    FATAL = 1,
    ERROR = 2,
    WARNING = 3,
    INFO = 4,
    DEBUG = 5,
    TRACE = 6,
  }

  /**
   * @event LOG_EVENT
   */
  export class LogEvent extends WebVisEvent {
    level: LogLevel;
    timestamp: string;
    message: string;
    /**
     * This event signals that a log has been printed.
     */
    constructor(level: LogLevel, timestamp: string, message: string);
  }
  /**
   * The possible progress states of a Measurement.
   */
  export enum MeasurementProgress {
    INTERACTING = 0,
    PROCESSING = 1,
    DONE = 2,
    FAILED = 3,
    NO_MORE = 4,
    UNKNOWN = 5,
  }
  /**
   * The result types of a Measuremet.
   */
  export enum MeasurementResultType {
    PICKED_POSITION = 0,
    VERTEX = 1,
    EDGE = 2,
    FACE = 3,
    SHAPE = 4,
    DISTANCE = 5,
    ANGLE = 6,
  }
  /**
   * The target types of a Measurement.
   */
  export enum MeasurementTargetType {
    group = 0,
    node = 1,
    shape = 2,
    edge = 3,
    face = 4,
    point = 5,
    line = 6,
    plane = 7,
    normal = 8,
  }
  /**
   * The types of Measurements.
   */
  export enum MeasurementType {
    SINGLE = 0,
    MULTIPLE = 1,
    ARC = 2,
    BBOX = 3,
  }
  /**
   * Different types of topology.
   */
  export enum TopologySemantic {
    length = 0,
    axis = 1,
    point = 2,
    direction = 3,
    area = 4,
    volume = 5,
    degree = 6,
    text = 7,
    plane = 8,
    line = 9,
  }

  /**
   * @event MEASUREMENT_CHANGED
   */
  export class MeasurementChangedEvent extends WebVisEvent {
    measurementID: number;
    progress: MeasurementProgress;
    visible?: boolean;
    name?: string;
    /**
     * The MEASUREMENT_CHANGED event occurs if a Measurement has been changed.
     * @param measurementID     The ID of the Measurement.
     * @param progress          The current progress of the Measurement.
     * @param visible           Sets the Measurement visibility on the UI.
     * @param name              The name of the Measurement.
     */
    constructor(
      measurementID: number,
      progress: MeasurementProgress,
      visible?: boolean,
      name?: string
    );
  }

  /**
   * MEASUREMENT_CREATED
   * @event MEASUREMENT_CREATED
   */
  export class MeasurementCreatedEvent extends WebVisEvent {
    measurementID: number;
    progress: MeasurementProgress;
    name?: string;
    anchorPosition?: Float32Array;
    labelPosition?: Float32Array;
    measurementData?: MeasurementData;
    /**
     * The MEASUREMENT_CREATED event occurs if a Measurement has been created.
     * @param measurementID     The ID of the Measurement.
     * @param progress          The progress of the Measurement.
     * @param name              The name of the Measurement.
     * @param anchorPosition    Anchor position in world space coordinates.
     * @param labelPosition     Label position in world space coordinates.
     * @param measurementData   The whole MeasurementData.
     */
    constructor(
      measurementID: number,
      progress: MeasurementProgress,
      name?: string,
      anchorPosition?: Float32Array,
      labelPosition?: Float32Array,
      measurementData?: MeasurementData
    );
  }

  /**
   * MEASUREMENT_REMOVED
   * @event MEASUREMENT_REMOVED
   */
  export class MeasurementRemovedEvent extends WebVisEvent {
    measurementID: number;
    /**
     * The MEASUREMENT_REMOVED event occurs if a Measurement has been removed.
     * @param measurementID     The ID of the Measurement.
     */
    constructor(measurementID: number);
  }

  export interface MeasurementDescriptor extends ITopologyDataSelector {
    name: string;
    position: [number, number, number] | Float32Array;
    value: any;
    l3dShapeInstanceGlobalIdMap?: Map<number, Array<number>>;
    target: MeasurementTargetType;
  }
  /**
   * These functions allow the creation of Measurements. A Measurement describes the distance between two points in the world.
   */
  export interface MeasurementAPI {
    /**
     * Creates a new measurement and returns the ID. If no name is given, the measurement will be
     * automatically named (e.g., “Measurement 23”).
     * @param {MeasurementType} type
     * @param {IClickResult} clickResult
     * @param {string} name
     * @param {Float32Array} anchorPosition
     * @param {Float32Array} labelOffset
     * @returns {number}
     */
    createMeasurement(
      type: MeasurementType,
      clickResult1: IClickResult,
      clickResult2?: IClickResult,
      name?: string
    ): number;
    changeMeasurement(
      measurementID: number,
      progress: MeasurementProgress,
      visible?: boolean,
      name?: string
    ): void;
    /**
     *
     * @param measurementID The ID of the Measurement.
     * @returns The MeasurementData.
     */
    getMeasurementData(measurementID: number): MeasurementData;
    /**
     * @returns {Array<number>} The IDs of all available Measurements.
     */
    getMeasurements(): Array<number>;
    /**
     *
     * @param data The MeasurementData that should be restored.
     * @param measurementID The ID of the restored Measurement.
     */
    restoreMeasurement(data: MeasurementData, measurementID?: number): number;
    /**
     * Calculates the additional measurement information like thickness and displays it in the UI.
     *
     * @param measurementID the ID of a Measurement
     */
    requestAdditionalMeasurementData(measurementID: number): void;
    /**
     * The measurement for the given measurementID is removed.
     * @param measurementID
     */
    removeMeasurement(measurementID: number): void;
    measureTangent(
      measurementDescriptor: MeasurementDescriptor,
      l3dToShapeInstanceIDMap: Map<number, Array<number>>
    ): Promise<TangentMeasurementResult>;
  }
  export type ArcMeasurementInfo = {
    points: Array<[number, number, number] | Float32Array>;
  };

  export type MeasurementData = {
    type: MeasurementType;
    name: string;
    visible: boolean;
    progress: MeasurementProgress;
    primary: Array<TopologyDataEntry>;
    secondary: Array<TopologyDataEntry>;
    expanded: boolean;
    topoSourceString: string;
    measurementDescriptors?: Array<MeasurementDescriptor>;
    generatedPoints: Array<[number, number, number] | Float32Array>;
    lineValues: number[][];
    anchorPoint: [number, number, number] | Float32Array;
    labelPoint: [number, number, number] | Float32Array;
    normal: [number, number, number] | Float32Array;
    measurementLines: Array<MeasurementLine>;
  };
  export type MeasurementLine = {
    startPoint: [number, number, number] | Float32Array;
    endPoint: [number, number, number] | Float32Array;
    style: string;
  };
  export type TangentMeasurementResult = {
    result: string;
    direction: Array<number>;
    error: string;
  };

  export type TopologyDataEntry = {
    type: string;
    properties: Array<TopologyDataProperty>;
    targets: Array<TopologyDataProperty>;
    topoType: string;
    topoString: string;
  };
  export type TopologyDataProperty = {
    name: string;
    semantic: string;
    value: any;
  };
  export type IRequestWrapper = {
    get: (
      http: any,
      options: {
        [key: string]: any;
      },
      callback: (response: any) => void,
      errorCallback: (error: any) => void
    ) => void;
    post: (
      http: any,
      options: {
        [key: string]: any;
      },
      headers: Array<[string, any]>,
      postContent: string,
      callback: (response: any) => void,
      errorCallback: (error: any) => void
    ) => void;
  };
  export enum NodePathFragmentType {
    LOCAL_ID = 0,
    LEAF_INDEX = 1,
    LINK_INDEX = 2,
  }

  /**
   * NodeIDs are generated during runtime. There is no guarantee, that the nodeIDs of a loaded model
   * are the same, if the 3D Space was reloaded in the browser.
   *
   * The NodePathAPI allows the user to handle nodes with static identifiers, which are not
   * changed during runtime. This holds, if the model resource is not changed.
   *
   * **Example**
   * ```typescript
   * // Get an instance of the ContextAPI
   * const myContext : ContextAPI = webvis.getContext( "example" )
   *
   * // add some Model
   * myContext.add(someModelURI);
   *
   * // the model is currently loading in the browser and we know, that the part which is of interest has the nodeID 170
   * // we execute the following code in the console to get a string that can be used to refer to the part everytime
   * const handle = await webvis.createNodePathHandles([170]);
   * const nodePathString = await webvis.requestNodePathStrings(handle);
   *
   * // Afterwards the nodePathString can be used to retrieve the runtime nodeID by script
   * const currentNodeID = (await myContext.requestNodePathHandleMap([ nodePathString ]))[nodePathString].nodeID;
   * ```
   *
   *
   */
  export interface NodePathAPI {
    /**
     * requestNodePathHandleMap Returns an object mapping from input paths to the respective handles.
     *
     * @param paths {Array<string | NodePathHandle>} The array of node path strings or handles.
     * @param scope {number} [scope=0] nodeID specifying the scope as starting point for the paths
     * @return {Promise<NodePathHandleMap>} The resulting object mapping paths to handles
     */
    requestNodePathHandleMap(
      paths: Array<string>,
      scope?: number
    ): Promise<NodePathHandleMap>;
    /**
     * createNodePathHandles Creates and returns handles for the target node ids or topology selectors.
     *
     * @param targets {Array<number>} Array of target node ids to create the handles for
     * @return {Promise<Array<NodePathHandle>>} The array of handles
     */
    createNodePathHandles(
      targets: Array<number>
    ): Promise<Array<NodePathHandle>>;
    /**
     * requestNodePathStrings Returns string representations for the respective node path handles.
     *
     * @param handles {Array<NodePathHandle>}
     * @param [scope=0] {number} nodeID specifying the scope as starting point for the path resolution
     * @param typePriorities {Array<NodePathFragmentType>} Array of  priorities to control the fragments for the path string assembly.
     * @return {Promise<Array<string>>} String representation of the node path for the respective scope.
     */
    requestNodePathStrings(
      handles: Array<NodePathHandle>,
      scope?: number,
      typePriorities?: Array<NodePathFragmentType>
    ): Promise<Array<string>>;
  }

  export type NodePathHandle = {
    nodeID: number;
    selector?: ITopologyDataSelector;
  };

  export type NodePathHandleMap = {
    [key: string]: NodePathHandle;
  };
  export enum NotificationLevel {
    FATAL = 0,
    ERROR = 1,
    WARNING = 2,
    INFORMATION = 3,
    DEBUG = 5,
    TRACE = 6,
  }

  /**
   * NOTIFICATION
   * @event NOTIFICATION
   */
  export class NotificationEvent extends WebVisEvent {
    message: string;
    notificationLevel: string;
    /**
     * The NOTIFICATION event occurs if a new notification arrives.
     * @param message               The notification message.
     * @param notificationLevel      The level of the notification.
     */
    constructor(message: string, notificationLevel: string);
  }

  /**
 * With the Query API you can access additional information about nodes.
 * <ol>
 * <li>
 * Query Object Structure<br><br>
 *
 * The query object is a JSON object which contains a select and a conditions block. The select block is an
 * array which defines the content and layout of the result. The conditions describe a set of tests on nodes
 * and their properties. The result will contain information for all elements on which all conditions passed
 * (implicit AND relation between condition array elements)
 * <br><br>
 * {<br>
 *  select:     [ <selectkey>,         <selectkey.value>      ]<br>
 *  conditions: [{<selectkey>:<value>, <conditionkey>:<value>}]<br>
 * }<br>
 * </li><br>
 * <li>
 * Select Keys<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Key</th>
 *     <th>Value</th>
 *     <th>Example</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>nodeId</td>
 *     <td>number</td>
 *     <td>42</td>
 *     <td>The id of an aux or structure node.</td>
 * </tr>
 * <tr>
 *     <td>property</td>
 *     <td>any</td>
 *     <td>"label"</td>
 *     <td>The name of the property to check. If the property is a structure the sub-elements can be accessed with ".". If no condition is set, the node is selected if the property has a non-empty value.</td>
 * </tr>
 * <tr>
 *     <td>metadata</td>
 *     <td>any</td>
 *     <td>"auxAttributes.productionClass", "auxProperties.lowerTolerance"</td>
 *     <td>The name of the property to check. If the property is a structure the sub-elements can be accessed with ".". If no condition is set, the node is selected if the property has a non-empty value.</td>
 * </tr>
 * <tr>
 *     <td>nodeType</td>
 *     <td>string</td>
 *     <td>"structure", "aux"</td>
 *     <td>Check if the node belongs to a specific class.</td>
 * </tr>
 * <tr>
 * <td>topoHandle</td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 1,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies one topological element. Topological elements can be faces edges or points.
 * The elementtype is identified by entityType which can be one of the following values:
 * </br> 1->face </br> 2->edge </br> 3->point </br> Note: This key is only used for the select part of the query as it is resolved to its specialization when returned. </br>  </td>
 * </tr>
 * <tr>
 * <td>faceHandle</td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 1,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies a topological element of type face.  </br>  </td>
 * </tr>
 * <tr>
 * <td> edgeHandle </td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 2,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies a topological element of type edge.  </br>  </td>
 * </tr>
 * <tr>
 * <td> pointHandle </td>
 * <td>json object</td>
 * <td>
 * {
 *   "entityID": 1583,
 *   "entityType": 3,
 *   "shapeInstanceID": 1
 * }
 * </td>
 * <td>An object that identifies a topological element of type point. </br>  </td>
 * </tr>

 * </table>
 * </li><br>
 * <li>
 * Conditions<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Key</th>
 *     <th>Value</th>
 *     <th>Example</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>equals</td>
 *     <td>any</td>
 *     <td>"myLabel", "Label_*"</td>
 *     <td>Check whether the selected property equals the set value. Can contain * for arbitrary characters and whitespaces for basic wildcard matching.</td>
 * </tr>
 * <tr>
 *     <td>lessThan</td>
 *     <td>number</td>
 *     <td>5</td>
 *     <td>Test if the property value is larger than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>lessOrEqualThan</td>
 *     <td>number</td>
 *     <td>4</td>
 *     <td>Test if the property value is larger or equal than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>greaterThan</td>
 *     <td>number</td>
 *     <td>10</td>
 *     <td>Test if the property value is smaller than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>greaterOrEqualThan</td>
 *     <td>number</td>
 *     <td>11</td>
 *     <td>Test if the property value is smaller than the specified value.</td>
 * </tr>
 * <tr>
 *     <td>caseSensitive</td>
 *     <td>boolean</td>
 *     <td>true</td>
 *     <td>Default is false.</td>
 * </tr>
 * <tr>
 *     <td>pointsTo</td>
 *     <td>number</td>
 *     <td>123 </td>
 *     <td>Is used to query aux to aux relations (see example).</td>
 * </tr>
 * </table>
 * </li><br>
 * <li>
 * Logical Keys<br><br>
 *
 * Logical keys can be put inside conditions instead of a select or condition key in order to express the corresponding logical operation.<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Key</th>
 *     <th>Value</th>
 *     <th>Example</th>
 *     <th>Description</th>
 * </tr>
 * <tr>
 *     <td>or</td>
 *     <td>array</td>
 *     <td>{"or": [{"nodeId": 15}, {"nodeId": 16}]}</td>
 *     <td>an OR relation</td>
 * </tr>
 * <tr>
 *     <td>and</td>
 *     <td>array</td>
 *     <td>{"and": [{"metadata": "auxProperties.sizeA", "equals": 15}, {"metadata": "auxProperties.sizeB", "equals": 20}]}</td>
 *     <td>an AND relation</td>
 * </tr>
 * <tr>
 *     <td>not</td>
 *     <td>condition</td>
 *     <td>{"not": {"metadata": "sizeA", "equals": 15}}</td>
 *     <td>invert a condition</td>
 * </tr>
 * </table>
 * </li><br>
 * <li>
 * Results<br><br>
 *
 * An array of arrays. For each successful condition match an array with the selected element values is returned. The order of values matches the select Specification.<br><br>
 *
 * <table style="width:100%">
 * <tr>
 *     <th>Select</th>
 *     <th>Result</th>
 * </tr>
 * <tr>
 *     <td>select: ["nodeId", "metadata.auxAttributes"]</td>
 *     <td>[[15, {...}], [42, {...}], ...]</td>
 * </tr>
 * </table>
 * </li><br>
 * <li>
 * Examples<br><br>
 *
 * <table style="width:100%">
 * <tr>
 * <th>Description</th>
 * <th>Query</th>
 * <th>Response</th>
 * </tr>
 * <tr>
 * <td>
 * Aux nodes for a faceHandle excluding nodes of type Revision index
 * </td>
 * <td>
 * {
 * "select": [
 *   "nodeId"
 * ],
 * "conditions": [
 *   {
 *     "nodeType": "aux"
 *   },
 *   {
 *     "faceHandle": {
 *       "entityType": 1,
 *       "shapeInstanceID": 2,
 *       "entityID": 814
 *     }
 *   },
 *   {
 *     "not": [
 *       {
 *         "metadata": "auxProperties.pmiType",
 *         "equals": "Revision Index"
 *       }
 *     ]
 *   }
 * ]
 * }
 * </td>
 * <td>
 * [
 *  [
 *    {
 *      "entityID": 1583,
 *      "entityType": 1,
 *      "shapeInstanceID": 1
 *    }
 *  ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Select topological elements connected to one auxNode
 * </td>
 * <td>
 *{
 *  "select": [
 *    "topoHandle"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "nodeId": 2502
 *    }
 *  ]
 *}
 * </td>
 * <td>
 * [
 *  [
 *    {
 *      "entityID": 1583,
 *      "entityType": 2,
 *      "shapeInstanceID": 1
 *    }
 *  ],
 *  [
 *    {
 *      "entityID": 1584,
 *      "entityType": 1,
 *      "shapeInstanceID": 1
 *    }
 *  ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Search metadata for minimum diameter
 * </td>
 * <td>
 * {
 *  "select":["nodeId", "metadata.auxProperties.label"],
 *  "conditions":[
 *   {"nodeType": "aux"},
 *   {"metadata":
 *     "auxProperties.pmiType",
 *     "equals": "Dimension"},
 *   {"metadata":
 *     "auxProperties.type",
 *     "equals": "Diameter"},
 *   {"metadata":
 *    "auxProperties.value",
 *    "greaterThan": 5.5}
 *  ]
 * }
 * </td>
 * <td>
 * [[15, "labelA"], [42, "labelB"], ...]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Textual search for modelView names
 * </td>
 * <td>
 *{
 *  "select": [
 *    "nodeId",
 *    "metadata.auxProperties.label"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "metadata": "auxProperties.pmiType",
 *      "equals": "ModelView"
 *    },
 *    {
 *      "metadata": "auxProperties.label",
 *      "equals": "2_51_*"
 *    }
 *  ]
 *}
 * </td>
 * <td>
 * [
 *  [
 *    8672,
 *    "2_51_Test_2_3"
 *  ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Search for PMI Type
 * </td>
 * <td>
 *    {
 * "select": [
 *   "nodeId",
 *   "metadata.auxProperties.*"
 * ],
 * "conditions": [
 *   {
 *     "nodeType": "aux"
 *   },
 *   {
 *     "metadata": "auxProperties.pmiType",
 *     "equals": "Dimension"
 *   },
 *   {
 *     "metadata": "auxProperties.fit",
 *     "equals": "h8",
 *     "caseSensitive": true
 *   }
 * ]
 *}
 * </td>
 * <td>
 * [
 * [
 *   5411,
 *   {
 *     "metadata.auxProperties.bottomRight": "0.0640887 0 -0.0686957",
 *     "metadata.auxProperties.type": "Linear",
 *    ...
 *   }
 * ]
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Search for attributes
 * </td>
 * <td>
 * {
 *  "select":["nodeId"],
 *  "conditions":[
 *   {"nodeType": "aux"},
 *   {"metadata":
 *    "auxAttributes.precision",
 *    "greaterThan": 2},
 *   {"metadata":
 *    "auxAttributes.originAnchor",
 *    "equals": 4},
 *  ]
 * }
 * </td>
 * <td>
 * [[15], [42], ...]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Nested query example
 * </td>
 * <td>
 *{
 *  "select": [
 *    "nodeId",
 *    "metadata.auxAttributes.label"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "metadata": "auxProperties.pmiType",
 *      "equals": "DatumFeatureSymbol"
 *    },
 *    {
 *      "metadata": "auxAttributes.label",
 *      "equals": {
 *        "select": [
 *          "metadata.auxProperties.propertyName"
 *        ],
 *        "conditions": [
 *          {
 *            "nodeType": "aux"
 *          },
 *          {
 *            "metadata": "auxProperties.pmiType",
 *            "equals": "frame"
 *          },
 *          {
 *            "nodeId": 7522
 *          }
 *        ]
 *      }
 *    }
 *  ]
 *}
 * </td>
 * <td>
 * [
 *  [
 *    1234,
 *    "abc"
 *  ],
 * .....
 *]
 * </td>
 * </tr>
 * <tr>
 * <td>
 * Query auxNodes of type ModelView connected to specific auxNode
 * </td>
 * <td>
 *{
 *"select": [
 *    "nodeId"
 *  ],
 *  "conditions": [
 *    {
 *      "nodeType": "aux"
 *    },
 *    {
 *      "metadata": "auxProperties.pmiType",
 *      "equals": "ModelView"
 *    },
 *    {
 *      "pointsTo": 323
 *    }
 *  ]
 * </td>
 * <td>
 * [
 *  [
 *    1234
 *  ],
 *  [
 *    3456
 *  ],
 * .....
 *]
 * </td>
 * </tr>
 * </table>
 * <br><br>
 * <li>
 * Full Example<br><br>
 *
* <br><br>
* const queryLabels = await context.query({
*                             select: ['nodeId', 'label'],
*                             conditions: [{ nodeType: 'aux' }, { metadata: 'auxProperties.pmiType', equals: 'ModelView' }]
*                         });
*    const queryPMIType = await context.query({
*    select: ['nodeId', 'auxProperties.pmiType'],
*    conditions: [{ nodeType: 'aux' }, { metadata: 'auxProperties.pmiType', equals: 'ModelView' }]
*    });
* </li>
 * </li>
 * </ol>
 */
  export interface QueryAPI {
    /**
     * Executes the query on the specified subtree
     * @param {IWebVisQuery | IWebVisQueryObject | string} query
     * @param {number} nodeID
     * @returns {IWebVisQuery}
     */
    query(query: Query | string, nodeID?: number): Promise<QueryResult>;
  }

  export type Query = {
    select: Array<QuerySelect>;
    conditions: Array<QueryCondition>;
    linkDepth?: number;
  };

  /**
   * The available conditions of a query.
   */
  export type QueryCondition = {
    nodeId?: number;
    originalFaceID?: number;
    ancestors?: Array<QueryCondition>;
    extFaceLink?: string;
    nodeType?: 'structure' | 'aux';
    metadata?: string;
    equals?: Query | string | number;
    equalsAny?: Array<string>;
    contains?: any;
    lessThan?: number;
    lessOrEqualThan?: number;
    greaterThan?: number;
    greaterOrEqualThan?: number;
    caseSensitive?: boolean;
    pointsTo?: number;
    linkDepth?: number;
    faceHandle?: TopologyHandle;
    not?: Array<QueryCondition>;
    and?: Array<QueryCondition>;
    or?: Array<QueryCondition>;
  };
  /**
   * The result of a Query.
   */
  export type QueryResult = {
    data: Array<any>;
    errors: Array<any>;
  };
  export type QuerySelect =
    | 'nodeId'
    | 'ancestor.nodeId'
    | 'ancestor.metadata'
    | 'ancestor.metadata.*'
    | 'structId'
    | 'auxId'
    | 'shapeId'
    | 'faceInstanceId'
    | 'edgeInstanceId'
    | 'pointInstanceId'
    | 'property'
    | 'metadata'
    | 'nodeType'
    | 'subtreeRootId'
    | string;
  export enum ModelTrackerConnectionState {
    START = 0,
    FAILED = 1,
    CONNECTING = 2,
    CONNECTED = 4,
    UNKNOWN = 8,
  }
  export enum ModelTrackingState {
    START = 0,
    INIT = 1,
    SNAPPED = 2,
    GENERIC = 4,
    UNKNOWN = 8,
  }
  export enum StreamConnectionState {
    START = 0,
    FAILED = 1,
    CONNECTING = 2,
    CONNECTED = 4,
    GENERIC = 8,
    READY = 16,
    UNKNOWN = 32,
  }
  export enum WorldMappingStatus {
    NOT_AVAILABLE = 0,
    LIMITED = 1,
    EXTENDING = 2,
    MAPPED = 3,
    UNKNOWN = 4,
  }
  export enum XRCapabilities {
    SLAM = 0,
    REMOTE_CONTROLLABLE = 1,
    MODELTRACKER = 2,
    IMAGE_SOURCE = 3,
    SHARED_ANCHOR_MS = 4,
    BOOSTER_FORWARD_AVAILABLE = 5,
    CAMERA_SERVICE_AVAILABLE = 6,
  }
  export enum XRSessionConnectionState {
    INIT = 0,
    CONNECTING = 1,
    CONNECTED = 2,
  }
  export enum XRState {
    UNKNOWN = 0,
    STOPPED = 1,
    FOLLOWING = 2,
    FIXATED = 4,
    STARTED = 8,
  }

  /**
   * XR_MEMBER_ADDED
   * @event XR_MEMBER_ADDED
   */
  export class XRMemberAddedEvent extends WebVisEvent {
    xrMemberId: number;
    constructor(xrMemberId: number);
  }

  /**
   * XR_MEMBER_CAPABILITIES_CHANGED
   * @event XR_MEMBER_CAPABILITIES_CHANGED
   */
  export class XRMemberCapabilitiesChangedEvent extends WebVisEvent {
    xrMemberId: number;
    xrCapabilities: Array<XRCapabilities>;
    constructor(xrMemberId: number, xrCapabilities: Array<XRCapabilities>);
  }

  /**
   * XR_MEMBER_MODELTRACKER_EDGEIMG_RECEIVED
   * @event XR_MEMBER_MODELTRACKER_EDGEIMG_RECEIVED
   */
  export class XRMemberModelTrackerEdgeImgReceivedEvent extends WebVisEvent {
    xrMemberId: number;
    img: any;
    constructor(xrMemberId: number, img: any);
  }

  /**
   * XR_MEMBER_MODELTRACKER_INFO_RECEIVED
   * @event XR_MEMBER_MODELTRACKER_INFO_RECEIVED
   */
  export class XRMemberModelTrackerInfoReceivedEvent extends WebVisEvent {
    xrMemberId: number;
    info: any;
    constructor(xrMemberId: number, info: any);
  }

  /**
   * XR_MEMBER_REMOVED
   * @event XR_MEMBER_REMOVED
   */
  export class XRMemberRemovedEvent extends WebVisEvent {
    xrMemberId: number;
    constructor(xrMemberId: number);
  }

  /**
   * XR_MEMBER_STATE_CHANGED
   * @event XR_MEMBER_STATE_CHANGED
   */
  export class XRMemberStateChangedEvent extends WebVisEvent {
    xrMemberId: number;
    xrMemberState: XRMemberState;
    constructor(xrMemberId: number, xrMemberState: XRMemberState);
  }

  /**
   * XR_SESSION_STATE_CHANGED
   * @event XR_SESSION_STATE_CHANGED
   */
  export class XRSessionStateChangedEvent extends WebVisEvent {
    state: XRSessionState;
    constructor(state: XRSessionState);
  }

  export interface RealityAPI {
    /**
     * @experimental
     *
     * @returns {Promise<boolean>} returns a Promise
     */
    connectXRSession(): Promise<XRSessionState>;
    /**
     * @experimental
     *
     * Get current state if XR functionality
     * @returns {XRSessionState} returns a Promise
     */
    getXRSessionState(): XRSessionState;
    /**
     * @experimental
     *
     * list all the available XR members in the current session
     * @returns {Promise<Array<XRMember>>} returns a Promise with the list of all available XRMembers
     */
    getXRMembers(): Array<number>;
    /**
     * @experimental
     *
     * list all the available XR members in the current session
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {XRMemberInfo} returns a struct containing all relevant infos
     * (memberId, XRCapabilities, sessionMemberData) for the given member
     */
    getXRMemberInfo(memberId: number): XRMemberInfo;
    /**
     * @experimental
     *
     * Get the runtime state of a XR Member
     * @param {number} memberId the XRMember that the state should be queried from
     * @returns {XRMemberState | undefined} returns either the member state if the member exist
     * or return undefined if xr is not connected or memberId does not exist
     */
    getXRMemberState(memberId: number): XRMemberState | undefined;
    /**
     * @experimental
     *
     * execute whatever is necessary to enable XRCapbilities on the given member, e.g. start
     * the camera or forward to the booster
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    requestXMemberCapabilities(memberId: number): Promise<boolean>;
    /**
     * @experimental
     *
     * enters the initialization phase for modeltracking, this is also used to reset
     * the current modeltracking. It will also trigger
     * REALITY_MODELTRACKERSTATE_CHANGED event with the ModelTrackingState.INIT set to true
     * By default the modeltracking will be softreset. If you choose to reset different data
     * on the modeltracker you can do so by specifying the xrInitOptions.
     *
     * @param {number} memberId the XRMember that the operation should be applied on
     * @param {XRInitOptions} xrInitOptions Specify initOptions. E.g. reset behavior of modeltracker. Default is softreset.
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    enterXRMemberInitMode(
      memberId: number,
      xrInitOptions?: XRInitOptions
    ): Promise<boolean>;
    /**
     * @experimental
     *
     * leaves the initialization phase for modeltracking, this will also fixate the model
     * at the current position
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    exitXRMemberInitMode(memberId: number): Promise<boolean>;
    /**
     * @experimental
     *
     * Puts the image stream in the background of the renderer. It will also trigger
     * REALITY_XRSTATE_CHANGED event with the XRState.FOLLOWING set to true
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    startXRMemberSpectate(memberId: number): Promise<boolean>;
    /**
     * @experimental
     *
     * Stops the image stream in the background of the renderer. It will also trigger
     * REALITY_XRSTATE_CHANGED event with the XRState.FOLLOWING set to false
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    stopXRMemberSpectate(memberId: number): Promise<boolean>;
    /**
     * @experimental
     *
     * Fixates the model at the current position. It will also trigger
     * REALITY_XRSTATE_CHANGED event with the XRState.FIXATED set to true
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    fixateXRMember(memberId: number): Promise<boolean>;
    /**
     * @experimental
     *
     * Unfixates the model. The model will move with the device. It will also trigger
     * REALITY_XRSTATE_CHANGED event with the XRState.FIXATED set to false
     * @param {number} memberId the XRMember that the operation should be applied on
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    unfixateXRMember(memberId: number): Promise<boolean>;
    /**
     * @experimental
     *
     * This will set settings for the specific xr member.
     *
     * modeltrackerQualityThreshold sets a normalized threshold for the modeltracker. The threshold determines the actual
     * correspondence of the generated line model to the real world. A value of 1 means total correspondence,
     * while a value of zero means no correspondence at all. Depending on that value the tracker will trigger
     * a REALITY_MODELTRACKERSTATE_CHANGED event with the ModelTrackingState.SNAPPED to true and a REALITY_XRSTATE_CHANGED event
     * with XRState.FIXATED set to true
     *
     * enableDebugImages will enable or disable the edge images to be send from the modeltracker. If set to true it will trigger
     * REALITY_MODELTRACKER_EDGEIMG_RECEIVED events once an debug image arrives. Note: When enabled this will impact
     * bandwidth and perfomance of the application, so we recommand using this only on demand.
     *
     * @param {number} memberId the XRMember that the operation should be applied on
     * @param {XRMemberSettings} settings The quality threshold for the modeltracker must be between 0 and 1
     * @returns {Promise<boolean>} returns a Promise which reports wether the operation
     * was successful or not
     */
    setXRMemberSettings(
      memberId: number,
      settings: XRMemberSettings
    ): Promise<boolean>;
    /**
     * @deprecated
     *
     * start AR. Projects the camera stream in the background and starts searching for the given reference.
     * The reference is defined by setting the realproperty on the particular node via the webvis API.
     * E.g. webvis.setProperty(0, pluginAPI.realProperty, pluginAPI.realState.Enabled)
     * @returns {Promise<boolean>} returns true if starting was successfull or false if it could not start AR
     */
    startAR(): Promise<boolean>;
    /**
     * @deprecated
     *
     * stop AR. Stop projecting the camera stream in the background and reset background to default color.
     * @returns {Promise<boolean>} returns true if stopping was successfull or false if it could not stop AR
     */
    stopAR(): Promise<boolean>;
    /**
     * @deprecated
     *
     * restart modeltracker initialization for the local xr member
     * @returns {Promise<boolean>} returns true if resetting was successfull or false if not
     */
    resetAR(): Promise<boolean>;
    /**
     * @deprecated
     *
     * show expert dialog for developers or advanced users
     * @returns {Promise<boolean>} returns true if the operation was successfull or false if not
     */
    showExpertDialog(): Promise<boolean>;
  }

  export type ModelTrackerSettings = {
    modelTrackingThreshold?: TrackingSettingData;
    smoothness?: TrackingSettingData;
  };

  export type TrackingDebugEventData = {
    type: string;
    data: {
      state: {
        objects: Array<TrackingStatusData>;
      };
      settings: Array<TrackingSettingData>;
      misc: {
        debugPort: number;
      };
    };
  };
  export type TrackingSettingData = {
    displayName: string;
    key: string;
    minValue: number;
    maxValue: number;
    stepSize: number;
    currentValue: number;
    description: string;
    dynamic: boolean;
    showQualityThreshold: boolean;
  };
  export type TrackingStatusData = {
    name: string;
    state: string;
    quality: number;
    _InitInlierRatio: number;
    _InitNumOfCorresp: number;
    _TrackingInlierRatio: number;
    _TrackingNumOfCorresp: number;
    _SFHFrameDist: number;
    _Total3DFeatureCount: number;
    _NumberOfTemplates: number;
    _NumberOfTemplatesOnline: number;
    _NumberOfTemplatesOffline: number;
    _TrackingImageWidth: number;
    _TrackingImageHeight: number;
  };
  /**
   * Defines the init behavior of modeltracking. E.g. the reset behavior.
   */
  export type XRInitOptions = {
    /**
     * Specify if a reset hard should be executed. If set to true all runtime data
     * learned during tracking will be omitted.
     * @default false
     */
    resetHard?: boolean;
    /**
     * Specify if a view fitting should be performed. If set to true the model will
     * be fitted to the current view volume. Otherwise it will stay at its current position.
     * @default true
     */
    fitView?: boolean;
  };
  export type XRMemberDebugSettings = {
    /**
     * @experimental
     *
     * Request a service state dump, which will be send over the debugInfo
     * channel (TrackerDebugInfo flatbuffer)
     */
    requestStateReport?: boolean;
    /**
     * @experimental
     *
     * Enables live stats communication from tracker service to the client
     * which will be send over the debugInfo
     * channel (TrackerDebugInfo flatbuffer)
     */
    requestServiceStatsLive?: boolean;
  };

  export type XRMemberInfo = {
    sessionMemberData: SessionMemberData;
    sessionMemberId: number;
    xrCapabilities: Array<XRCapabilities>;
  };
  export type XRMemberSettings = {
    /**
     * @experimental
     *
     * This is a normalized threshold for the modeltracker. The threshold determines the actual
     * correspondence of the generated line model to the real world. A value of 1 means total correspondence,
     * while a value of zero means no correspondence at all. Depending on that value the tracker will trigger
     * a REALITY_MODELTRACKERSTATE_CHANGED event with the ModelTrackingState.SNAPPED to true and a REALITY_XRSTATE_CHANGED event
     * with XRState.FIXATED set to true
     */
    modeltrackerQualityThreshold?: number;
    /**
     * @experimental
     *
     * This enables or disables the edge images to be send from the modeltracker. If set to true it will trigger
     * REALITY_MODELTRACKER_EDGEIMG_RECEIVED events once an debug image arrives. Note: When enabled this will impact
     * bandwidth and perfomance of the application, so we recommand using this only on demand.
     */
    enableDebugImages?: boolean;
    /**
     * @experimental
     *
     * This is a normalized input value for smoothing of the incoming tracker pose,
     * so frequent pose adjustments will be smoothed in, instead of applied directly.
     * A value of 0 will disable pose smoothing and a value of 1.0 will apply maximum smoothness
     */
    modelTrackerSmoothingFactor?: number;
  };

  export type XRMemberState = {
    imageStreamConnectionState?: StreamConnectionState;
    imageAdapterConnectionState?: StreamConnectionState;
    modelTrackerConnectionState?: ModelTrackerConnectionState;
    modelTrackingState?: ModelTrackingState;
    modelTrackerSettings?: ModelTrackerSettings;
    worldTrackingState?: WorldMappingStatus;
    started?: boolean;
    following?: boolean;
    fixated?: boolean;
  };

  export type XRSessionState = {
    connectionState: XRSessionConnectionState;
  };

  /**
   * REQUEST_ERROR
   * @event REQUEST_ERROR
   */
  export class RequestErrorEvent extends WebVisEvent {
    status: number;
    statusText: string;
    /**
     * The RequestErrorEvent occurs if an internal network request fails.
     * @param {number} status - Status code of the failed request.
     * @param {string} statusText - Status text of the failed request.
     * @param {string} url - Requested URL of the failed Request.
     */
    constructor(status: number, statusText: string, url: string);
  }

  /**
   * @event SELECTION_CHANGED
   */
  export class SelectionChangedEvent extends WebVisEvent {
    targetNodeID: number;
    oldSelectionCount: number;
    newSelectionCount: number;
    selectedNodes: Array<number>;
    /**
     * The SELECTION_CHANGED event occurs if a Selection has been changed.
     * @param targetNodeID The ID of the node which Selection has changed.
     * @param oldSelectionCount The number of previous selected Nodes.
     * @param newSelectionCount The number of currently selected Nodes.
     * @param selectedNodes The IDs of the currently selected Nodes.
     */
    constructor(
      targetNodeID: number,
      oldSelectionCount: number,
      newSelectionCount: number,
      selectedNodes: Array<number>
    );
  }

  /**
   * The **SelectionAPI** provides basic functionalities to manipulate the current selection of Nodes.
   */
  export interface SelectionAPI {
    /**
     * Returns a list of all selected nodes.
     *
     * @deprecated getSelection is deprecated, please use [[getSelectedNodes]] instead.
     *
     * @return An array which contains the IDs of all leaf Nodes in the current Selection.
     */
    getSelection(): Promise<Array<number>>;
    /**
     * Returns a list of all selected nodes.
     *
     * @return An array which contains the IDs of all Nodes in the current Selection.
     */
    getSelectedLeafNodes(): Array<number>;
    /**
     * Returns all selected leaf nodes.
     *
     * @returns An array which contains the IDs of all leaf Nodes in the current Selection.
     */
    getSelectedNodes(): Array<number>;
    /**
     * Replaces the current Selection with the Nodes from the given Collection.
     *
     * @param collectionID The ID of the Collection.
     * @param silent If set to true, no event will be emitted.
     */
    selectCollection(
      collectionID: number,
      silent?: boolean
    ): Promise<ChangeSelectionResult | void>;
    /**
     * Clears the current Selection.
     *
     * @param silent If set to true, no event will be emitted.
     */
    clearSelection(silent?: boolean): Promise<ChangeSelectionResult>;
    /**
     * Inverts the current Selection.
     *
     * @param silent If set to true, no event will be emitted.
     */
    invertSelection(silent?: boolean): Promise<ChangeSelectionResult>;
    /**
     * Adds the given Nodes to the Selection.
     *
     * @param nodeID    The ID of the Node that should be added to the current Selection
     * @param silent If set to true, no event will be emitted.
     */
    addToSelection(
      nodeID: number | Array<number>,
      silent?: boolean
    ): Promise<ChangeSelectionResult>;
    /**
     * Removes the given nodes from the Selection
     *
     * @param nodeID The ID of the Node that should be removed from the current Selection
     * @param silent If set to true, no event will be emitted.
     */
    removeFromSelection(
      nodeID: number | Array<number>,
      silent?: boolean
    ): Promise<ChangeSelectionResult>;
    /**
     * Checks if the specified Node is part of the selection.
     *
     * @param nodeID The ID of the node for which we would like to know if it is selected or not.
     * @returns True of the given node is selected, otherwise false.
     */
    isSelected(nodeID: number): Promise<boolean>;
    /**
     * Replaces the current Selection with the specified nodes.
     *
     * @param nodeID The nodeID(s) to select.
     * @param silent If set to true, no event will be emitted.
     */
    setSelection(
      nodeID: number | Array<number>,
      silent?: boolean
    ): Promise<ChangeSelectionResult>;
  }
  export type ChangeSelectionResult = {
    targetNodeID: number;
    oldSelectionCount: number;
    newSelectionCount: number;
    selectedNodes: Array<number>;
  };
  export enum MemberPrivileges {
    Moderator = 'moderator',
  }
  export enum SessionConnectionState {
    INIT = 0,
    CONNECTING = 1,
    CONNECTED = 2,
  }
  export interface SharedSessionData {
    wsEndpoint: string;
    initPose: Float32Array;
    sessionID: string;
    resetURL: string;
    debugURL: string;
    paramsURL: string;
  }

  /**
   * CREDENTIALS_AQUISITION_UPDATE
   * @event CREDENTIALS_AQUISITION_UPDATE
   */
  export class CredentialsAquisitionUpdateEvent extends WebVisEvent {
    accepted: boolean;
    credentials: string;
    /**
     * This event signals new or failed credentials acquisition.
     * @param {string} accepted Is true when credentials were found.
     * @param {string} credentials The credentials data.
     */
    constructor(accepted: boolean, credentials: string);
  }

  /**
   * MEMBER_JOINED
   * @event MEMBER_JOINED
   */
  export class MemberJoinedEvent extends WebVisEvent {
    memberData: SessionMemberData;
    /**
     * This event occurs if a new SessionMember has joined.
     * @param memberData Information about the joined member.
     */
    constructor(memberData: SessionMemberData);
  }

  /**
   * MEMBER_LEFT
   * @event MEMBER_LEFT
   */
  export class MemberLeftEvent extends WebVisEvent {
    memberID: number;
    /**
     * This event occurs if a SessionMember has left.
     * @param memberID The ID of the SessionMember.
     */
    constructor(memberID: number);
  }

  /**
   * MEMBER_UPDATED
   * @event MEMBER_UPDATED
   */
  export class MemberUpdatedEvent extends WebVisEvent {
    memberData: SessionMemberData;
    /**
     * This event occurs if the data of a SessionMember has changed.
     * @param memberData The updated information about the  SessionMember.
     */
    constructor(memberData: SessionMemberData);
  }

  /**
   * SESSION_PARAMETER_CHANGED
   * @event SESSION_PARAMETER_CHANGED
   */
  export class SessionParameterChangedEvent extends WebVisEvent {
    sessionParameter: string;
    memberID?: number;
    available?: boolean;
    interest?: boolean;
    /***
     * The SESSION_PARAMETER_CHANGED event is fired when a session parameter has been changed.
     * @param {string} sessionParameter The key of the changed session parameter.
     * @param {number} memberID The (optional) memberID for which a member session parameter was changed.
     */
    constructor(
      sessionParameter: string,
      memberID?: number,
      available?: boolean,
      interest?: boolean
    );
  }

  /**
   * SESSION_STATE_CHANGED
   * @event SESSION_STATE_CHANGED
   */
  export class SessionStateChangedEvent extends WebVisEvent {
    sessionStateData: SessionStateData;
    /**
     * This event occurs if the state of a Session has changed.
     * @param sessionStateData The changed SessionStateData.
     */
    constructor(sessionStateData: SessionStateData);
  }

  /**
   * SESSION_TRANSFER
   * @event SESSION_TRANSFER
   */
  export class SessionTransferEvent extends WebVisEvent {
    sessionID: string;
    /**
     * This event signals a that the session is transferring.
     * @param {string} sessionID The id of the new session.
     */
    constructor(sessionID: string);
  }

  /**
   * STATE_SYNC
   * @event STATE_SYNC
   */
  export class StateSyncEvent extends WebVisEvent {
    isEmpty: boolean;
    sessionStore?: SessionStore;
    sessionSyncData?: SessionSyncData | SessionSyncDataMap;
    /***
     * The STATE_SYNC event is fired to sync new members of a session.
     * @param isEmpty {boolean} Hints that the state is empty. Depending on this the client might want to replace the session state with its own.
     * @param sessionStore {SessionStore} The SessionStore we have to load if the state is not empty.
     * @param sessionSyncData {SessionSyncData | SessionSyncDataMap} Additional data we need for synchronization.
     */
    constructor(
      isEmpty: boolean,
      sessionStore?: SessionStore,
      sessionSyncData?: SessionSyncData | SessionSyncDataMap
    );
  }

  /**
   * STREAM_STATE_CHANGED
   * @event STREAM_STATE_CHANGED
   */
  export class StreamStateChangedEvent extends WebVisEvent {
    streamStateData: StreamStateData;
    /**
     * This event occurs if the state of a Stream has changed.
     * @param sessionStateData The changed StreamStateData.
     */
    constructor(streamStateData: StreamStateData);
  }

  /**
   * The SessionAPI allows to share the state of the InstanceGraph between multiple user in a collaborative setting.
   *
   */
  export interface SessionAPI {
    /**
     * Connects to a Session. If the ID does not exist, a new Session will be created.
     * @param sessionID The ID of the Session.
     * @param name The ID of the Session.
     */
    connectToSession(
      sessionID?: string,
      name?: string
    ): Promise<SessionStateData>;
    /**
     * Disconnects from a Session.
     */
    disconnectFromSession(): void;
    /**
     * Shuts down a Session and disconnects all joined SessionMembers.
     */
    shutdownSession(): Promise<void>;
    /**
     * Removes a SessionMember from a Session.
     * @param memberID The ID of the SessionMember.
     */
    removeSessionMember(memberID: number): void;
    /**
     * Promotes a SessionMember to the Role of the Moderator.
     * @param memberID The ID of the SessionMember.
     */
    promoteSessionMember(memberID: number): void;
    /**
     * @return The ID of the SessionMember.
     */
    getSessionMemberID(): number;
    /**
     * @return The IDs of all SessionMembers.
     */
    getSessionMembers(): Promise<Array<SessionMemberData>>;
    /**
     * @return Information about the Session.
     */
    getSessionStateData(): SessionStateData;
    /**
     * @hidden
     */
    getSessionStreams(
      conditions?: SessionStreamCondition
    ): Promise<Array<SessionStreamData>>;
    /**
     * @hidden
     */
    awaitStream(conditions: SessionStreamCondition): Promise<SessionStreamData>;
    /**
     * @hidden
     */
    subscribeStream(
      streamID: number,
      callback?: SessionStreamMessageCallback
    ): Promise<void>;
    /**
     * @hidden
     */
    unsubscribeStream(
      streamID: number,
      callback: SessionStreamMessageCallback
    ): void;
    /**
     * @hidden
     */
    publishStream(data: SessionStreamData): Promise<number>;
    /**
     * @hidden
     */
    removeStream(streamID: number): void;
    /**
     * @hidden
     */
    onStreamStateChange(
      streamID: number,
      callback: SessionStreamStateChangedCallback
    ): void;
    /**
     * @hidden
     */
    sendToStream(streamID: number, message: string | ArrayBuffer): void;
    /**
     * @hidden
     */
    readSessionParameter(
      sessionParameter: string,
      flags: {
        [key: string]: any;
      }
    ): Promise<any>;
    /**
     * @hidden
     */
    changeSessionParameter(
      sessionParameter: string,
      value?: any,
      flags?: {
        [key: string]: any;
      }
    ): void;
    /**
     * @hidden
     */
    attachMediaTrack(
      streamID: number,
      track: MediaStreamTrack,
      stream: MediaStream
    ): void;
    /**
     * @hidden
     */
    onMediaTrack(
      streamID: number,
      callback: (track: MediaStreamTrack, streams: Array<MediaStream>) => void
    ): void;
  }
  export type JoinSessionRequestContent = {
    scenarioUri?: string;
    name?: string;
    roleHints?: string | Array<string>;
    confidence?: number;
    deviceTags?: Array<string>;
    spaceDomain?: string;
    settings?: Object;
    token?: string;
    forwardURL?: string;
  };

  /**
   * The information about a SessionMember.
   */
  export type SessionMemberData = {
    name?: string;
    deviceTags?: Array<string>;
    assignedRoles?: Array<string>;
    assignedDirectives?: Array<string>;
    memberId?: number;
    roleHints?: Array<string>;
    spaceDomain?: string;
    settings?: {
      [key: string]: any;
    };
    privileges?: Array<MemberPrivileges>;
  };

  /**
   * The information about a Session.
   */
  export type SessionStateData = {
    state?: SessionConnectionState;
    sessionUri?: string;
    scenarios: Array<string>;
    sessionWsUri?: string;
    sessionId?: string;
    sessionWasEmpty?: boolean;
    hidden?: boolean;
  } & SessionMemberData;
  /**
   * @hidden
   */
  export interface SessionStreamCondition {
    streamId?: number;
    name?: string;
    content?: string;
    contentType?: string;
    connectionType?: string;
    location?: string;
    memberId?: number;
    metadata?: any;
    [key: number]: any;
  }

  /**
   * @hidden
   */
  export type SessionStreamData = {
    streamId?: number;
    name: string;
    content: string;
    contentType: string;
    connectionType: string;
    location?: string;
    memberId: number;
    metadata?: any;
    space?: string;
    transmissionHints?: StreamTransMissionHints;
  };
  /**
   * @hidden
   */
  export type SessionStreamMessageCallback = (
    message: string | ArrayBuffer
  ) => void;

  /**
   * @hidden
   */
  export type SessionStreamStateChangedCallback = (
    connectionData: StreamStateData
  ) => void;
  export type SessionSyncData = {
    annotationIDs: number[];
    attachmentsIDs: number[];
    drawingIDs: number[];
    measurementIDs: number[];
    snapshotIDs: number[];
    runtimeIDs: number[];
  };
  export type SessionSyncDataMap = {
    runtimeIDs: {
      [key: number]: number;
    };
    instanceIDs: {
      [key: number]: number;
    };
    drawingIDs: {
      [key: number]: number;
    };
  };
  /**
   * @hidden
   */
  export type StreamSignal = {
    [key: string]: any;
  };

  /**
   * @hidden
   */
  export type StreamStateData = {
    streamId: number;
    subscriberCount?: number;
    interest?: boolean;
    available?: boolean;
    location?: string;
    signal?: StreamSignal;
  };
  /**
   * @hidden
   */
  export type StreamTransMissionHints = {
    frameSkipThreshold?: number;
  };

  export interface JoinSessionResponseContent extends SessionMemberData {
    memberToken: string;
    authorization?: string;
    restrictedJoin: boolean;
    restrictedAccess: boolean;
    protocolMajor: number;
    protocolMinor: number;
    protocolPatch: number;
  }
  export interface LoadScenarioRequestContent {
    scenario: string;
  }
  export interface LoadSessionRequestContent {
    sessionID?: string;
    sessionStore: SessionStore;
  }
  export type PublishStreamRequestContent = SessionStreamData;
  export type RemoveStreamRequestContent = {
    streamID: number;
  };
  export interface ChangeSessionParameterRequestContent {
    sessionParameter: string;
    value?: any;
    memberID?: number;
    declare?: boolean;
    interest?: boolean;
  }
  export interface ReadSessionParameterRequestContent {
    sessionParameter?: string;
    memberID?: number;
  }
  export interface PublishStreamResponseContent {
    streamId: number;
    location?: string;
  }
  export type SendStreamSignalRequestContent = StreamStateData;
  export interface AnswerMemberRequestRequestContent {
    transactionCode: string;
    data: any;
  }
  export interface AnswerCredentialsRequestRequestContent {
    requesterID: number;
    providerID: number;
    accept: boolean;
  }
  export interface AddRequestContent {
    parentId: number;
    dataUri: string;
    label?: string;
    initialProperties?: {
      [key: string]: any;
    };
    mimeType?: string;
    usage?: string;
  }
  export interface AddResponseContent {
    nodeId: number;
    transactionId: number;
  }
  export interface AddCustomNodeRequestContent {
    customType: string;
    attachmentId: number;
  }
  export interface AddCustomNodeResponseContent {
    nodeId: number;
    transactionId: number;
  }
  export interface RemoveRequestContent {
    nodeId: Array<number>;
  }
  export interface RemoveResponseContent {
    transactionId: number;
  }
  export interface SetPropertyRequestContent {
    nodeId: Array<number>;
    property: string;
    value: any;
    recursive?: boolean;
  }
  export interface SetPropertyResponseContent {
    transactionId: number;
  }
  export interface ResetPropertiesRequestContent {
    nodeId: number;
    properties: Array<string>;
  }
  export interface ResetPropertiesResponseContent {
    transactionId: number;
  }
  export interface SetEnabledLayersRequestContent {
    name: string;
    enabled: boolean;
  }
  export interface SetEnabledLayersResponseContent {
    transactionId: number;
  }
  export interface CreateClipPlaneRequestContent {
    properties: ClipPlaneProperties;
  }
  export interface CreateClipPlaneResponseContent {
    clipPlaneId: number;
    transactionId: number;
  }
  export interface ChangeClipPlaneRequestContent {
    clipPlaneId: number;
    changelist: ClipPlaneProperties;
  }
  export interface ChangeClipPlaneResponseContent {
    transactionId: number;
  }
  export interface RemoveClipPlaneRequestContent {
    clipPlaneId: number;
  }
  export interface RemoveClipPlaneResponseContent {
    transactionId: number;
  }
  export interface CreateClippingRoomRequestContent {
    properties: ClipRoomProperties;
  }
  export interface CreateClippingRoomResponseContent {
    transactionId: number;
  }
  export interface ChangeClippingRoomRequestContent {
    changelist: ClipRoomProperties;
  }
  export interface ChangeClippingRoomResponseContent {
    transactionId: number;
  }
  export interface RemoveClippingRoomRequestContent {}
  export interface RemoveClippingRoomResponseContent {
    transactionId: number;
  }
  export interface CreateDrawingResponseContent {
    drawingId: number;
    transactionId: number;
  }
  export interface CreateDrawingRequestContent {
    attachment: number;
    properties: DrawingProperties;
  }
  export interface ChangeDrawingResponseContent {
    transactionId: number;
  }
  export interface ChangeDrawingRequestContent {
    drawingId: number;
    properties: DrawingProperties;
  }
  export interface RemoveDrawingResponseContent {
    transactionId: number;
  }
  export interface RemoveDrawingRequestContent {
    drawingId: number;
  }
  export interface CreateAnnotationRequestContent {
    nodeID: number;
    label: string;
    visible: boolean;
    anchorPosition: [number, number, number];
    labelOffset: [number, number, number];
  }
  export interface CreateAnnotationResponseContent {
    annotationId: number;
    transactionId: number;
  }
  export interface ChangeAnnotationRequestContent {
    annotationId: number;
    label: string;
    visible: boolean;
    anchorPosition: [number, number, number];
    labelOffset: [number, number, number];
    active: boolean;
    transform: Array<number>;
  }
  export interface ChangeAnnotationResponseContent {
    transactionId: number;
  }
  export interface RemoveAnnotationRequestContent {
    annotationId: number;
  }
  export interface RemoveAnnotationResponseContent {
    transactionId: number;
  }
  export interface CreateMeasurementRequestContent {
    measurementData: any;
  }
  export interface CreateMeasurementResponseContent {
    measurementId: number;
    transactionId: number;
  }
  export interface RemoveMeasurementRequestContent {
    measurementId: number;
  }
  export interface RemoveMeasurementResponseContent {
    measurementId: number;
    transactionId: number;
  }
  export interface CreateSnapshotRequestContent {
    name: string;
    attachmentID: number;
    cameraStore: {
      viewMatrix: number[];
      centerOfRotation: number[];
      viewPointDiameter: number;
      viewPlaneDistance: number;
      cameraType: number;
    };
  }
  export interface CreateSnapshotResponseContent {
    snapshotId: number;
    transactionId: number;
  }
  export interface ChangeSnapshotRequestContent {
    snapshotId: number;
    properties: SnapshotProperties;
  }
  export interface ChangeSnapshotResponseContent {
    transactionId: number;
  }
  export interface RestoreSnapshotRequestContent {
    snapshotId: number;
    settings: SnapshotRestoreOptions;
  }
  export interface RestoreSnapshotResponseContent {
    transactionId: number;
  }
  export interface RemoveSnapshotRequestContent {
    snapshotId: number;
  }
  export interface RemoveSnapshotResponseContent {
    snapshotId: number;
    transactionId: number;
  }
  export interface RemoveMemberRequestContent {
    memberID: number;
  }
  export interface PromoteMemberRequestContent {
    memberID: number;
  }
  export interface AddToSelectionRequestContent {
    nodeID: Array<number>;
  }
  export interface AddToSelectionResponseContent {
    transactionId: number;
  }
  export interface RemoveFromSelectionRequestContent {
    nodeID: Array<number>;
  }
  export interface RemoveFromSelectionResponseContent {
    transactionId: number;
  }
  export interface SetSelectionRequestContent {
    nodeID: Array<number>;
  }
  export interface SetSelectionResponseContent {
    transactionId: number;
  }
  export interface ClearSelectionResponseContent {
    transactionId: number;
  }
  export interface InvertSelectionResponseContent {
    transactionId: number;
  }
  export interface GetL3DInfoRequestContent {
    nodeId?: number;
    objectId?: number;
    instanceId?: number;
    nodeIds?: Array<number>;
    objectIds?: Array<number>;
    instanceIds?: Array<number>;
    recursive?: boolean;
  }
  export type SimpleL3DInfo = {
    path: number[];
    remoteID: number;
    remoteIDOffset: number;
    remoteShapeIDOffset: number;
    remoteNodeCount: number;
    remoteShapeCount: number;
  };
  export type GetSimpleL3DInfoRequestContent = {
    nodeIDs?: number[];
    pathes?: number[][];
    shapeIDs?: number[];
  };
  export type GetSimpleL3DInfoResponseContent = SimpleL3DInfo[] | [];
  export interface RegisterCustomPropertyRequestContent {
    name: string;
    recursive: boolean;
    defaultValue: any;
  }
  export interface RegisterCustomPropertyResponseContent {
    transactionId: number;
  }
  export interface CreateAnimationFramesRequestContent {
    name: string;
    frames: Array<AnimationFrame>;
  }
  export interface CreateAnimationFramesResponseContent {
    transactionId: number;
  }
  export interface RemoveAnimationFramesRequestContent {
    name: string;
  }
  export interface RemoveAnimationFramesResponseContent {
    transactionId: number;
  }
  export interface CreateAttachmentRequestContent {
    type: string;
  }
  export interface CreateAttachmentResponseContent {
    attachmentId: number;
    transactionId: number;
  }
  export interface SetAttachmentDataRequestContent {
    attachmentId: number;
    attachmentData: any;
  }
  export interface SetAttachmentDataResponseContent {
    transactionId: number;
  }
  export interface RemoveAttachmentRequestContent {
    attachmentId: number;
  }
  export interface RemoveAttachmentResponseContent {
    transactionId: number;
  }
  export interface TransferSessionRequestContent {
    sessionID: string;
  }
  export interface SetVariantEnabledRequestContent {
    variant: number;
    enabled: boolean;
  }
  export interface SetVariantEnabledResponseContent {
    transactionId: number;
  }

  /**
   * INTERNAL_SNAPSHOT_CREATED
   * @event INTERNAL_SNAPSHOT_CREATED
   */
  export class InternalSnapshotCreatedEvent extends WebVisEvent {
    snapshotID: number;
    name?: string;
    attachmentID?: number;
    cameraStore?: {
      viewMatrix: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
      ];
      centerOfRotation: [number, number, number];
      viewPointDiameter: number;
      viewPlaneDistance: number;
      cameraType: number;
    };
    snapshotStore?: any;
    propertyKeys?: Array<string>;
    instanceStores?: {
      [key: number]: any;
    };
    sessionSyncData?: SessionSyncDataMap;
    /**
     * The INTERNAL_SNAPSHOT_CREATED event occurs if a Snapshot is created.
     * @param {number} snapshotID The ID of the Snapshot.
     * @param {string} name The name of the Snapshot.
     * @param {number} attachmentID The ID of the Attachment.
     * @param {Object} cameraStore
     * @param {SnapshotStore} snapshotStore (only for navis)
     * @param {string[]} propertyKeys (only for navis)
     * @param {[key:number]:any} instanceStores (only for navis)
     * @param {SessionSyncDataMap} sessionSyncData (only for navis)
     */
    constructor(
      snapshotID: number,
      name?: string,
      attachmentID?: number,
      cameraStore?: {
        viewMatrix: [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ];
        centerOfRotation: [number, number, number];
        viewPointDiameter: number;
        viewPlaneDistance: number;
        cameraType: number;
      },
      snapshotStore?: any,
      propertyKeys?: Array<string>,
      instanceStores?: {
        [key: number]: any;
      },
      sessionSyncData?: SessionSyncDataMap
    );
  }

  /**
   * SNAPSHOT_CHANGED
   * @event SNAPSHOT_CHANGED
   */
  export class SnapshotChangedEvent extends WebVisEvent {
    snapshotID: number;
    properties: SnapshotProperties;
    /**
     * The SNAPSHOT_CHANGED event occurs if a Snapshot has been changed.
     * @param snapshotID - The ID of the Snapshot.
     * @param {SnapshotProperties} properties - An object with the changed Properties.
     */
    constructor(snapshotID: number, properties: SnapshotProperties);
    /**
     * @deprecated order is deprecated, please use properties.order instead.
     */
    get order(): number;
    /**
     * @deprecated screenshot is deprecated, please use properties.screenshot instead.
     */
    get screenshot(): string;
    /**
     * @deprecated text is deprecated, please use properties.name instead.
     */
    get text(): string;
  }

  /**
   * SNAPSHOT_CREATED
   * @event SNAPSHOT_CREATED
   */
  export class SnapshotCreatedEvent extends WebVisEvent {
    snapshotID: number;
    properties: SnapshotProperties;
    private _attachmentId;
    /**
     * The SNAPSHOT_CREATED event occurs if a Snapshot has been created.
     * @param {number} snapshotID The ID of the Snapshot.
     */
    constructor(
      snapshotID: number,
      properties: SnapshotProperties,
      _attachmentId: number
    );
    /**
     * @deprecated attachmentID is deprecated, please use properties.thumbnail instead.
     */
    get attachmentID(): number;
    /**
     * @deprecated name is deprecated, please use properties.name instead.
     */
    get name(): string;
    /**
     * @deprecated order is deprecated, please use properties.order instead.
     */
    get order(): number;
  }

  /**
   * SNAPSHOT_CREATED
   * @event SNAPSHOT_CREATED
   */
  export class SnapshotCreationStartedEvent extends WebVisEvent {
    /**
     * The SNAPSHOT_CREATION_STARTED event occurs at the beginning of a Snapshot creation.
     */
    constructor();
  }

  /**
   * SNAPSHOT_REMOVED
   * @event SNAPSHOT_REMOVED
   */
  export class SnapshotRemovedEvent extends WebVisEvent {
    snapshotID: number;
    /**
     * The SNAPSHOT_REMOVED event occurs if a snapshot has been removed.
     * @param snapshotID        The ID of the snapshot.
     */
    constructor(snapshotID: number);
  }

  /**
   * SNAPSHOT_RESTORED
   * @event SNAPSHOT_RESTORED
   */
  export class SnapshotRestoredEvent extends WebVisEvent {
    snapshotID: number;
    settings: SnapshotRestoreOptions;
    /**
     * The SNAPSHOT_RESTORED event occurs if a Snapshot has been restored.
     * @param snapshotID        The ID of the Snapshot.
     */
    constructor(snapshotID: number, settings: SnapshotRestoreOptions);
  }

  /**
   * SNAPSHOT_RESTORE_STARTED
   * @event SNAPSHOT_RESTORE_STARTED
   */
  export class SnapshotRestoreStartedEvent extends WebVisEvent {
    snapshotID: number;
    /**
     * The SNAPSHOT_RESTORE_STARTED event occurs if a Snapshot is triggered to be restored.
     * @param snapshotID        The ID of the Snapshot.
     */
    constructor(snapshotID: number);
  }

  /**
   * With these functions the user can control webvis' management of SessionStorage objects and Snapshots.
   *
   * The Session describes the whole state of the 3D Space, which can be shared, stored and restored.
   * Snapshot are a subset of a 3D Space and describe a momentary state, which can include other elements of the 3D Space
   * like Clipplanes and Measurements.
   */
  export interface SessionStorageAPI {
    /**
     * Creates a Snapshot of the current.
     * @param {string} name - The Name of the Snapshot.
     * @param {SnapshotCreationOptions} options - Options used for the Snapshot creation.
     * @returns {Promise<number>} The Snapshot ID.
     */
    createSnapshot(
      name?: string,
      options?: SnapshotCreationOptions
    ): Promise<number>;
    /**
     * Restores the Snapshot for the given snapshotID.
     * The settings parameter allows to control the subset of the Snapshot data to be restored.
     * @param {number} snapshotID
     * @param {SnapshotRestoreOptions} options
     */
    restoreSnapshot(
      snapshotID: number,
      options?: SnapshotRestoreOptions
    ): Promise<void>;
    /**
     * Changes one or more properties of a Snapshot with the specified ID.
     * @param {number} snapshotID - The ID of the Snapshot you want to change.
     * @param {SnapshotProperties} properties - The properties of the Snapshot you want to change.
     * @return An object with the changed Properties.
     */
    changeSnapshot(
      snapshotID: number,
      properties: SnapshotProperties
    ): SnapshotProperties;
    /**
     * This changes the textual description of the Snapshot for given snapshotID to the value of text.
     *
     * @deprecated Calling changeSnapshot with single parameters is deprecated, please use SnapshotProperties instead.
     * @param {number} snapshotID The ID of the Snapshot.
     * @param {string} name The new name of the Snapshot.
     * @param {string} screenshotURL The new screenshot URL of the Snapshot.
     * @param {number} index The order inside the List of Snapshots.
     */
    changeSnapshot(
      snapshotID: number,
      name?: string,
      screenshotURL?: string,
      order?: number
    ): SnapshotProperties;
    /**
     * Deletes the Snapshot for given snapshotID.
     * @param snapshotID
     */
    removeSnapshot(snapshotID: number): void;
    /**
     * Exports the current session state
     * @hidden
     */
    exportSession(): SessionStore;
    /**
     * Imports a session from the data string of the given format.
     * Supported formats are: JSON.
     * @param {any} data the content of the file.
     * @param {string} format
     */
    importSession(data: any, format?: 'xscn' | undefined): Promise<any>;
    /**
     * Checks if offline storage is currently available.
     * @returns {boolean}
     */
    isOfflineStorageAvailable(): Promise<boolean>;
    /**
     * Temporarily stores the Session in the infrastructure and returns a handle.
     *
     * @param {array} tags a list of tags to store with the Session Snapshot
     * @param {boolean} offline sets the space domain to the local one
     * @param {StoreSessionProgressCallback} called when the progress of the store operation changes
     * @returns {Promise<string>}
     */
    storeSession(
      offline?: boolean,
      progressCallback?: StoreSessionProgressCallback
    ): Promise<string | void>;
    /**
     * Imports the Session for the given data handle from the infrastructure.
     * @param {string} handle
     * @returns {Promise<void>}
     */
    restoreSession(handle: string): Promise<void>;
    /**
     * Returns the ids of all available Snapshots.
     * @returns {Array<number>} The ids of all available Snapshots.
     */
    getSnapshots(): Array<number>;
    /**
     * @returns {SnapshotData} The data of the specified Snapshot.
     */
    requestSnapshotData(snapshotID: number): Promise<SnapshotProperties>;
    /**
     *
     * @deprecated getSnapshotData is deprecated, please use [[requestSnapshotData]] instead.
     * @returns {{ name: string, attachmentID: number, order: number }} The data of the specified Snapshot.
     */
    getSnapshotData(snapshotID: number): {
      name: string;
      attachmentID: number;
      order: number;
    };
  }

  export type SessionStore = {
    instances: {
      [key: number]: any;
    };
    snapshots: {
      [key: number]: any;
    };
    drawings: {
      [key: number]: any;
    };
    attachments: Array<any>;
    customProperties: Array<any>;
    propertyKeys: Array<string>;
    activeSnapshotID: number;
    tags: {
      [key: string]: string;
    };
    animationFrames: {
      [key: string]: Array<AnimationFrame>;
    };
    about: {
      [key: string]: string;
    };
  };
  /**
   * Different Options used for the Snapshot creation.
   */
  export type SnapshotCreationOptions = {
    /**
     * Specifies if a thumbnail is created or not.
     * @default true
     */
    thumbnail?: boolean;
    /**
     * Specifies the height of the thumbnail.
     * If the thumbnail height or width is not set the current viewer size is used.
     * @default undefined
     */
    thumbnailHeight?: number;
    /**
     * Specifies the width of the thumbnail.
     * If the thumbnail height or width is not set the current viewer size is used.
     * @default undefined
     */
    thumbnailWidth?: number;
  };
  export type SnapshotProperties = {
    /**
     * The name of the Snapshot.
     * @default undefined
     */
    name?: string | undefined;
    /**
     * The order of the Snapshot.
     * @default undefined
     */
    order?: number | undefined;
    /**
     * The thumbnail of the Snapshot as Base64 encoded jpg or png.
     * @default undefined
     */
    thumbnail?: string | undefined;
  };
  export type SnapshotRestoreOptions = {
    restoreAnnotations?: boolean;
    restoreCamera?: boolean;
    restoreDrawings?: boolean;
    restoreLayerFilter?: boolean;
    restoreMeasurements?: boolean;
    restoreSelection?: boolean;
    restoreTree?: boolean;
  };
  export type StoreSessionProgressCallback = (
    id: string,
    current: number,
    total: number
  ) => void;
  export enum SettingStrings {
    /**
     * A list of cookies that are added to all requests.
     * @type Array
     * @key_string additionalCookies
     */
    ADDITIONAL_COOKIES = 'additionalCookies',
    /**
     * Specifies additional request headers
     * @type {[key:string]:string}[]
     * @key_ additionalRequestHeaders
     */
    ADDITIONAL_REQUEST_HEADERS = 'additionalRequestHeaders',
    /**
     * Allows to specify additional key-value pairs passed as query parameters to the WebSocket URI.
     * The following keys are currently not allowed "token", "memberId".
     * @type {[key:string]:string}
     */
    ADDITIONAL_WS_QUERY_PARAMETERS = 'additionalWSQueryParameters',
    /**
     * @deprecated SettingStrings.ANNOTATION_EDITING_ENABLED is deprecated, please use UISetting.ANNOTATION_EDITING_ENABLED and the getSetting/setSetting functions on the webvisUI-Object"
     * Enables/Disables the Annotation editing on double-click
     * @type String
     * @key_string annotationEditingEnabled
     */
    ANNOTATION_EDITING_ENABLED = 'annotationEditingEnabled',
    /**
     * ARKit configuration settings - Configuration object contains values for arkitFPS and JPEGCompression.
     * - jpegCompression - values range from 0.0 to 1.0
     * - arkitFps - update framerate for processing.
     * - Current config JSON at <HUB_URL>/repo/webvis/config.json
     *{
     * ...,
     * "arkitConfigs": {
     *      "default": {
     *          "jpegCompression": "0.5",
     *          "arkitFps": "30",
     *          "webviewSettings": {}
     *      }}
     * ...,
     * }
     * @type object
     * @key_string arkitConfigs
     */
    ARKIT_CONFIG = 'arkitConfigs',
    /**
     * Set if aux mode searches attached faces recursively
     * @type Boolean
     * @key_ auxModeRecursiveSearch
     */
    AUX_MODE_RECURSIVE_SEARCH = 'auxModeRecursiveSearch',
    /**
     * Uncolor all faces when leaving the aux mode
     * @type string
     * @key_string expandOnViewerSelection
     */
    AUX_MODE_UNCOLOR_FACES_ON_LEAVE = 'auxModeUncolorFacesOnLeave',
    /**
     * The endpoint where webvis tries to connect to the booster
     * @type string
     * @key_ boosterURL
     */
    BOOSTER_URL = 'boosterURL',
    /**
     * Specifies the color of the capping geometries
     * @type string
     * @key_ cappingGeometryColor
     */
    CAPPING_GEOMETRY_COLOR = 'cappingGeometryColor',
    /**
     * @deprecated SettingStrings.CONTEXT_MENU_FUNCTION is deprecated, please use UISetting.CONTEXT_MENU_FUNCTION and the getSetting/setSetting functions on the webvisUI-Object"
     *
     * A function to modify the context menu's contents
     * This function has as argument: the array with the entries by default of the context menu;
     * and consequently it is expected as a return value, the entries that are wanted to be shown in the context menu:
     *
     * 1. All default entries will be shown:
     *      function(defaultEntries){return defaultEntries}
     *
     * 2. All default entries will be shown, but without the first entry:
     *      function(defaultEntries){
     *          firstEntryPosition = 1;
     *          defaultEntries.splice(firstEntryPosition - 1, 1);
     *          return defaultEntries;
     *      }
     *
     * 3. Swapping the first and second entries:
     *      function(defaultEntries){
     *          firstEntryPosition = 1;
     *          secondEntryPosition = 2;
     *          firstEntry = defaultEntries.splice(firstEntryPosition - 1, 1)[0];
     *          defaultEntries.splice(secondEntryPosition - 1, 0, firstEntry);
     *          return defaultEntries;
     *      }
     *
     * 4. Changing the functionality of the second entry:
     *      function(defaultEntries){
     *          secondEntryPosition = 2;
     *          secondEntryDefaultCommand = defaultEntries[secondEntryPosition - 1].command;
     *          defaultEntries[secondEntryPosition - 1].command = function(nodeId, pickInfo){
     *              console.log("Second Entry was Executed", nodeId, pickInfo);
     *              webvis.getProperty(nodeId, "label").then(
     *                  function(label){
     *                      webvis.postInfo("<table style="border:1px black pointed"><tr><td>Node:<td>" + nodeId +
     *                                      "<tr><td>Label:<td>" + label +
     *                                      "<tr><td>2D Coords:<td>" + pickInfo.canvasCoords +
     *                                      "<tr><td>3D Pos:<td>" + pickInfo.position)+"</table>";
     *              });
     *              secondEntryDefaultCommand();
     *          };
     *          return defaultEntries;
     *      }
     *
     *  5. Inserting a new entry in the menu at the third position:
     *      function(defaultEntries){
     *           newEntry = {
     *              label : "Set Current Language",
     *              subEntries : [
     *                      {
     *                          label : "English",
     *                          command : function(){webvis.changeSetting("language", "en")}
     *                      },
     *                      {
     *                          label : "Deutsch",
     *                          command : function(){webvis.changeSetting("language", "de")}
     *                      },
     *                      {
     *                          label : "Español",
     *                          command : function(){webvis.changeSetting("language", "es")}
     *                      }
     *              ]
     *           };
     *          newEntryPosition = 3;
     *          defaultEntries.splice(newEntryPosition - 1, 0, newEntry);
     *          return defaultEntries;
     *      }
     *
     * 6. Inserting a new entry in the menu, which will appear only after the condition is fulfilled, (e.g. When the node is an Aux node)
     *      function (defaultEntries)
     *       {
     *          const newEntry =
     *                      {
     *                          label : "Custom entry visible only when condition is fulfilled"
     *                          , command : function(nodeID){webvis.postInfo("Custom entry clicked on Aux node:" + nodeID + "!!!")}
     *                          , condition : function(nodeID){return webvis.getNodeType(nodeID) == webvis.NodeType.AUX}
     *                      };
     *          defaultEntries.push(newEntry);
     *          return defaultEntries;
     *       }
     *
     * @type Function (names : Array<ContextMenuEntry>) : Array<ContextMenuEntry>
     * @key_string labelTooltipFunction


     * A function to modify the context menu's contents
     * @type Function (names  Array<ContextMenuEntry>)  Array<ContextMenuEntry>
     * @key_ labelTooltipFunction
     */
    CONTEXT_MENU_FUNCTION = 'contextMenuFunction',
    /**
     * @deprecated SettingStrings.CUSTOM_ICON_MAP is deprecated, please use UISetting.CUSTOM_ICON_MAP and the getSetting/setSetting functions on the webvisUI-Object
     *
     * Allows to add custom UI icons
     * @type Object
     * @key_string customIconMap
     */
    CUSTOM_ICON_MAP = 'customIconMap',
    /**
     * @deprecated SettingStrings.CUSTOM_TOOLBAR_ICON_MAP is deprecated, please use UISetting.CUSTOM_TOOLBAR_ICON_MAP and the getSetting/setSetting functions on the webvisUI-Object
     *
     * Custom Toolbar Icons
     * @type string
     * @key_string customToolbarIconMap
     */
    CUSTOM_TOOLBAR_ICON_MAP = 'customToolbarIconMap',
    /**
     * Default value for the link depth (resource links) for queries
     * @type String
     * @key_string defaultQueryLinkDepth
     */
    DEFAULT_QUERY_LINK_DEPTH = 'defaultQueryLinkDepth',
    /**
     * Scaling factor for the the gizmo geometries
     * @type Number
     * @key_ gizmoScale
     */
    DISABLE_DEFAULT_INTERACTION = 'disableDefaultInteraction',
    /**
     *
     * @type String
     * @key_string hubURL
     **/
    HUB_URL = 'hubURL',
    /**
     * Check for initial state activation
     * @type boolean
     * @key_ initialStateActivation
     */
    INITIAL_STATE_ACTIVATION = 'initialStateActivation',
    /**
     * @deprecated SettingStrings.CUSTOM_TOOLBAR_ICON_MAP is deprecated, please use UISetting.CUSTOM_TOOLBAR_ICON_MAP and the getSetting/setSetting functions on the webvisUI-Object
     *
     * Sets the language for the UI s.
     * @type option     ["en", "de", "fr", "zh"]
     * @key_ language
     */
    LANGUAGE = 'language',
    /**
     * @experimental
     *
     * Specifies if the configuration file of the instant3Dhub installation gets applied.
     */
    LOAD_REMOTE_CONFIG_FILE = 'loadRemoteConfigFile',
    /**
     * Sets the log level
     * @type LogLevel
     */
    LOG_LEVEL = 'logLevel',
    /**
     * This limits the range of the active scene volume
     * @type String
     * @key_string maxActiveSceneVolumeDiameter
     */
    MAX_ACTIVE_SCENE_VOLUME_DIAMETER = 'maxActiveSceneVolumeDiameter',
    /**
     * Maximum number of concurrent downloads
     * @type Number
     * @key_string maxConcurrentDownloads
     */
    MAX_CONCURRENT_DOWNLOADS = 'maxConcurrentDownloads',
    /**
     * Angular tolerance for measurements, in degrees.
     * This value can be used to treat almost-perpendicular cases as perpendicular,
     * which allows to measure orthogonal distances between almost-perpendicular planes or lines.
     * @type number
     * @key_ measurementAngularTolerance
     */
    MEASUREMENT_ANGULAR_TOLERANCE = 'measurementAngularTolerance',
    /**
     * Measurement materials densities. The  is parsed as JSON and contains a map from material to density factor.
     * @type object
     * @key_ measurementMaterialDensities
     */
    MEASUREMENT_MATERIAL_DENSITIES = 'measurementMaterialDensities',
    /**
     * @deprecated SettingStrings.MODELVIEW_PRINT_CONTENT_FUNCTION is deprecated, please use UISetting.MODELVIEW_PRINT_CONTENT_FUNCTION and the getSetting/setSetting functions on the webvisUI-Object
     *
     * Specifies a function which returns additional content for the modelview printing
     * Function signature is function(context:contextAPI, nodeID:number, modelViewID:number) : Promise<string>
     * @type String
     * @key_string modelviewPrintContentFunction
     */
    MODELVIEW_PRINT_CONTENT_FUNCTION = 'modelviewPrintContentFunction',
    /**
     * @deprecated SettingStrings.MODELVIEW_PRINT_RESOURCE_NAME_FUNCTION is deprecated, please use UISetting.MODELVIEW_PRINT_RESOURCE_NAME_FUNCTION and the getSetting/setSetting functions on the webvisUI-Object
     *
     * Specifies a function which returns custom name for the resource drop-down of the ModelViewPrintDialog
     * Function signature is function(context:contextAPI, nodeID:number) : Promise<string>
     * @type String
     * @key_string modelviewPrintResourceNameFunction
     */
    MODELVIEW_PRINT_RESOURCE_NAME_FUNCTION = '\u00B4modelviewPrintResourceNameFunction',
    /**
     * Log levels activated for notifications.
     * The value is an array of s. Valid entries are
     * "INFORMATION", "WARNING" and "ERROR".
     * @type Array
     * @key_ notificationLogLevels
     */
    NOTIFICATION_LOG_LEVELS = 'notificationLogLevels',
    /**
     * Enables/disables the parent select feature
     * @type boolean
     * @key_ parentSelectEnabled
     */
    PARENT_SELECT_ENABLED = 'parentSelectEnabled',
    /**
     * Hint about the usage of credentials when issuing HTTP Requests.
     * The given method is used as a first try, the alternative one afterwards, if errors occur.
     * @type Boolean
     * @key_string preferXHRWithCredentials
     */
    PREFER_XHR_WITH_CREDENTIALS = 'preferXHRWithCredentials',
    /**
     * Defines additional device tags that are communicated with the session
     * @type Array
     * @key_ sessionDeviceTags
     */
    SESSION_DEVICE_TAGS = 'sessionDeviceTags',
    /**
     * The URL the Session-Handler should forward to
     * @type String
     * @key_ sessionForwardUrl
     */
    SESSION_FORWARD_URL = 'sessionForwardUrl',
    /**
     * A set of descriptors to interact with session members
     * @type Array
     * @key_ sessionInteractions
     */
    SESSION_INTERACTIONS = 'sessionInteractions',
    /**
     * The name that should be used when joining a shared session
     * @type String
     * @key_ sessionMemberName
     */
    SESSION_MEMBER_NAME = 'sessionMemberName',
    /**
     * Ignore unauthorized certificates when running in node
     * @type Boolean
     * @key_string skipSslVerify
     */
    SKIP_SSL_VERIFY = 'skipSslVerify',
    /**
     * This is for development - Slam provider setting.
     * Possible values: "sequence"
     * If you use "sequence" a pre recorded tracking sequence will be played in the background, to enable application
     * developers an easy way to develop AR experiences
     * You can specify additional parameters by appending them
     * to with semicolon:
     * manifest by appending the url to the manifest after a semicolon.
     * E.g.: sequence;url=<URL-TO-MANIFEST>;fps=30
     *
     * Possible Parameters are:
     * url: Url to manifest.json for imageSequence(escaped url)
     * fps: playback fps for image sequence
     * startIndex: Start Index for image sequence
     * endIndex: End Index for image sequence
     * @type string
     * @key_ slamProviderType
     */
    SLAM_PROVIDER_TYPE = 'slamProviderType',
    /**
     * sets the default loading behaviour on SnapshotRestore
     * @type SnapshotContentselection
     * @key_string snapshotContentSelection
     */
    SNAPSHOT_CONTENT_SELECTION = 'snapshotContentSelection',
    /**
     * A map to rewrite the uri to the network
     * @type [[URIMap]]
     */
    URI_MAP = 'uriMap',
    /**
     * Enables or disables XR
     * @type Boolean
     * @key_ xrEnabled
     */
    XR_ENABLED = 'xrEnabled',
  }
  export enum ViewerSettingStrings {
    /**
     * Toggles the screen space AntiAliasing.
     * @type Boolean
     * @key_string aaSetting
     */
    AA_SETTING_ENABLED = 'aaSetting',
    /**
     * Sets/gets the current availability of the 3 color comparison
     * @type Boolean
     * @key_string childInstanceCreationsPerFrame
     */
    BACKGROUND_COLOR = 'backgroundColor',
    /**
     * Sets the camera field of view in degrees
     * @type number
     * @key_string defaultFieldOfView
     */
    CAMERA_FIELD_OF_VIEW = 'defaultFieldOfView',
    /**
     * Sets the edge color of the capping effect
     * @type string
     * @default urn:X-l3d:color:rgba:00000000
     */
    CAPPING_EFFECT_EDGE_COLOR = 'cappingEffectEdgeColor',
    /**
     * Sets the inner color of the capping effect
     * @type string
     * @default urn:X-l3d:color:rgba:00000000
     */
    CAPPING_EFFECT_INNER_COLOR = 'cappingEffectInnerColor',
    /**
     * Enables/Disables the capping effect
     * @type boolean
     * @default false
     */
    CAPPING_EFFECT_ENABLED = 'cappingEffectEnabled',
    /**
     * Toggles the random part color effect.
     * @type Boolean
     * @key_string colorizeEffect
     */
    COLORIZE_EFFECT_ENABLED = 'colorizeEffect',
    /**
     * Three color comparison matching color
     * @type String
     * @key_ colorComparisonMatchingColor
     */
    COLOR_COMPARISON_MATCHING_COLOR = 'colorComparisonMatchingColor',
    /**
     * Three color comparison first color
     * @type String
     * @key_ colorComparisonFirstColor
     */
    COLOR_COMPARISON_FIRST_COLOR = 'colorComparisonFirstColor',
    /**
     * Three color comparison second color
     * @type String
     * @key_ colorComparisonSecondColor
     */
    COLOR_COMPARISON_SECOND_COLOR = 'colorComparisonSecondColor',
    /**
     * Defines the front plane of the model for use with the UI elements.
     * @type option          ["-yz", "xy", …]
     * @key_ coordSys
     */
    COORDINATE_SYSTEM = 'coordSys',
    /**
     * Defines whether a viewer shows specular highlighting or not
     * @type boolean
     */
    DISABLE_SPECULAR_HIGHLIGHT = 'disableSpecularHighlights',
    /**
     * Defines the factor the volumes are scaled with for double click animation.
     * @type number
     */
    DOUBLE_CLICK_ANIMATION_VOLUME_SCALE = 'doubleClickAnimationVolumeScale',
    /**
     * Sets the time window for a double click
     * @type number
     * @key_string doubleClickTimeWindow
     */
    DOUBLE_CLICK_TIME_WINDOW = 'doubleClickTimeWindow',
    /**
     * Enables/disables dynamic aux contrast
     * @type Boolean
     * @key_string dynamicAuxContrastEnabled
     */
    DYNAMIC_AUX_CONTRAST_ENABLED = 'dynamicAuxContrastEnabled',
    /**
     * Defines the state of dynamic clipping (enabled/disabled).
     * @type boolean
     */
    DYNAMIC_CLIPPING_ENABLED = 'dynamicClippingEnabled',
    /**
     * Defines the dynamic clipping distance.
     * @type number
     */
    DYNAMIC_CLIPPING_DISTANCE = 'dynamicClippingDistance',
    /**
     * Enables/disables the dynanic center of rotation feature
     * @type boolean
     * @key_string dynamicCOREnabled
     */
    DYNAMIC_COR_ENABLED = 'dynamicCOREnabled',
    /**
     * Expands a subtree to the leaf when selected in the viewer
     * @type string
     * @key_string expandOnViewerSelection
     */
    EXPAND_ON_VIEWER_SELECTION = 'expandOnViewerSelection',
    /**
     * Color to be used to indicate highlighted faces in the 3D view.
     * @type String
     * @key_ faceHighlightColor
     */
    FACE_HIGHLIGHT_COLOR = 'faceHighlightColor',
    /**
     * Color to be used to indicate selected faces in the 3D view.
     * @type String
     * @key_ preSelectionColor
     */
    FACE_SELECTION_COLOR = 'faceSelectionColor',
    /**
     * Sets the factor for the view fitting
     * @type number
     * @key_string fitViewFactor
     */
    FIT_VIEW_FACTOR = 'fitViewFactor',
    /**
     * Enables/disables the flyto on double click feature
     * @type boolean
     * @key_string flyToOnDoubleClick
     */
    FLYTO_ON_DOUBLECLICK_ENABLED = 'flyToOnDoubleClick',
    /**
     * Defines the speed for the Fly navigation mode
     * @type boolean
     * @key_string flyNavigationSpeed
     */
    FLY_NAVIGATION_SPEED = 'flyNavigationSpeed',
    /**
     * Defines whether a viewer should focus on a part on double click
     * @type boolean
     */
    FOCUS_ON_DOUBLE_CLICK = 'focusOnDoubleClick',
    /**
     * Enable frustum culling.
     * @type Boolean
     * @key_string frustumCulling
     */
    FRUSTUM_CULLING = 'frustumCulling',
    /**
     * Enables/Disables the gizmos for manipulating 3D entities in the viewer.
     * @type Boolean
     * @key_ gizmosEnabled
     */
    GIZMOS_ENABLED = 'gizmosEnabled',
    /**
     * Scaling factor for the the gizmo geometries
     * @type Number
     * @key_ gizmoScale
     */
    GIZMO_SCALING_FACTOR = 'gizmoScalingFactor',
    /**
     * @type Number
     * @key_string gpuMemoryReleaseFactor
     */
    GPU_MEMORY_RELEASE_FACTOR = 'gpuMemoryReleaseFactor',
    /**
     * Fit on first enable
     * @type Boolean
     * @key_string initialFit
     */
    INITIAL_FIT = 'initialFit',
    /**
     * Set a view matrix to show on start
     * @type Array<number>
     * @key_ initView
     */
    INIT_VIEW = 'initView',
    /**
     * Inversion if mouse zoom direction
     * @type Boolean
     * @key_string mouseInvertZoomingDirection
     */
    INVERT_ZOOM_DIRECTION = 'mouseInvertZoomingDirection',
    /**
     * Specifies the lighting environment.
     * @type option	: ["HEADLIGHT", "FOUR_POINT_LIGHTING"]
     */
    LIGHTING_ENVIRONMENT = 'lightingEnvironment',
    /**
     * Color to be used to indicate highlighted lines in the 3D view.
     * @type String
     * @key_ lineHighlightColor
     */
    LINE_HIGHLIGHT_COLOR = 'lineHighlightColor',
    /**
     * Color to be used to indicate selected lines in the 3D view.
     * @type String
     * @key_ lineSelectionColor
     */
    LINE_SELECTION_COLOR = 'lineSelectionColor',
    /**
     * Maximum dynamic clipping distance.
     * @type Number
     * @key_ maxDynamicClipDistance
     */
    MAX_DYNAMIC_CLIP_DIST = 'maxDynamicClipDistance',
    /**
     * Limit for GPU memory.
     * @type Number
     * @key_string maxGPUMemory
     */
    MAX_GPU_MEMORY = 'maxGPUMemory',
    /**
     * Limit for CPU-side memory (RAM).
     * @type Number
     * @key_string maxSRCCPUMemory
     */
    MAX_SRC_MEMORY = 'maxSRCCPUMemory',
    /**
     * The
     * @type Boolean
     * @key_string userInputMaps
     */
    NAVIGATION_MODE = 'navigationMode',
    /**
     * Sampling factor during navigation.
     * @type number
     * @key_string navigationSampling
     */
    NAVIGATION_SAMPLING = 'navigationSampling',
    /**
     * Factor to change the navigation speed
     * @type number
     * @key_string navigationSpeedFactor
     */
    NAVIGATION_SPEED_FACTOR = 'navigationSpeedFactor',
    /**
     * Factor to throttle the navigation speed when the modifier key is pressed
     * @type number
     * @key_string navigationSpeedThrottleFactor
     */
    NAVIGATION_SPEED_THROTTLE_FACTOR = 'navigationSpeedThrottleFactor',
    /**
     * Color for the drawing.
     * @type String
     */
    DRAWING_COLOR = 'drawingColor',
    /**
     * Specifies the Drawing mode.
     * @type DrawingMode
     */
    DRAWING_MODE = 'drawingMode',
    /**
     * Size for the drawing.
     * @type Number
     */
    DRAWING_SIZE = 'drawingSize',
    /**
     * Color to be used to indicate the parts the user is interacting with in the 3D scene.
     * @type String
     * @key_ preSelectionColor
     */
    PRE_SELECTION_COLOR = 'preSelectionColor',
    /**
     * Specifies the type of camera projection.
     * @type option	: ["PERSPECTIVE", "ORTHOGRAPHIC"]
     */
    PROJECTION_TYPE = 'projectionType',
    /**
     * Sets the ratio used to decrease the canvas size for render services
     * @type number
     * @key_string renderServiceCanvasRatio
     */
    RENDERSERVICE_CANVAS_RATIO = 'renderServiceCanvasRatio',
    /**
     * Defines whether a viewer renders auxiliaries on top or not
     * @type boolean
     */
    RENDER_AUXILIARY_ON_TOP = 'renderAuxOnTop',
    /**
     * Defines the render mode
     * @type option	: ["Faces = 0", "Topology= 1", "FacesTopology = 2", "OccluderTopology = 4"]
     */
    RENDER_MODE = 'renderMode',
    /**
     * Sets the setup's type for the render
     * @type String  Auto/Select
     * @key_ renderSetup
     */
    RENDER_SETUP = 'renderSetup',
    /**
     * Specifies how the screen space coverage which is used for the culling is calculated.
     * @type Boolean
     */
    SCREEN_SPACE_COVERAGE_CALCULATION_METHOD = 'screenSpaceCoverageCalculationMethod',
    /**
     * Color to be used to indicate selected parts in the 3D view.
     * @type String
     * @key_ selectionColor
     */
    SELECTION_COLOR = 'selectionColor',
    /**
     * Defines whether a viewer shows the AUX-Geometries during navigation or not
     * @type boolean
     */
    SHOW_AUX_ON_NAVIGATION = 'showAuxOnNavigation',
    /**
     * Changes the color of the silhouette rendering effect.
     * @type String
     * @key_string silhouetteEffectColor
     */
    SILHOUETTE_EFFECT_COLOR = 'silhouetteEffectColor',
    /**
     * Toggles the silhouette rendering effect.
     * @type Boolean
     * @key_string silhouetteEffect
     */
    SILHOUETTE_EFFECT_ENABLED = 'silhouetteEffect',
    /**
     * Draws only the silhouettes.
     * @type Boolean
     * @key_string silhouetteEffectExclusiveEnabled
     */
    SILHOUETTE_EFFECT_EXCLUSIVE_ENABLED = 'silhouetteEffectExclusiveEnabled',
    /**
     * Enable small feature culling.
     * @type Boolean
     * @key_string smallFeatureCulling
     */
    SMALL_FEATURE_CULLING = 'smallFeatureCulling',
    /**
     * Small feature threshold in pixel.
     * @type number
     * @key_string smallFeaturePixelThreshold
     */
    SMALL_FEATURE_PIXEL_THRESHOLD = 'smallFeaturePixelThreshold',
    /**
     * Enable software occlusion culling.
     * @type Boolean
     * @key_string soc
     */
    SOFTWAR_OCCLUSION_CULLING = 'soc',
    /**
     * Multiplier used to adjust space mouse sensitivity
     * @type Number
     * @key_string spacemouseMultiplier
     */
    SPACEMOUSE_MULTIPLIER = 'spacemouseMultiplier',
    /**
     * Color for the topological geometry.
     * @type String
     * @key_string topoGeometryColor
     */
    TOPO_GEOMETRY_COLOR = 'topoGeometryColor',
    /**
     * Color for the topological geometry.
     * @type String
     * @key_string topoGeometryColor
     */
    TOPO_GEOMETRY_SECONDARY_COLOR = 'topoGeometrySecondaryColor',
    /**
     * Defines the state of topological points rendering (enabled/disabled).
     * @type Boolean
     * @key_string topoPointsEnabled
     */
    TOPO_POINTS_ENABLED = 'topoPointsEnabled',
    /**
     * Defines the lower the vertical limits for the Turntable navigation mode
     * @type boolean
     * @key_string turntableLowerVerticalLimit
     */
    TURNTABLE_LOWER_VERTICAL_LIMIT = 'turntableLowerVerticalLimit',
    /**
     * Defines the upper vertical limis for the Turntable navigation mode
     * @type boolean
     * @key_string turntableUpperVerticalLimit
     */
    TURNTABLE_UPPER_VERTICAL_LIMIT = 'turntableUpperVerticalLimit',
    /**
     * Enables/disables the vertical limis for the Turntable navigation mode
     * @type boolean
     * @key_string turntableVerticalLimitsEnabled
     */
    TURNTABLE_VERTICAL_LIMITS_ENABLED = 'turntableVerticalLimitsEnabled',
    /**
     * Specifies if the canvas is scaled by the window.devicePixelRation
     * @type number
     * @key_string useDevicePixelRatio
     */
    USE_DEVICE_PIXEL_RATIO = 'useDevicePixelRatio',
    /**
     * Enabled vertex color rendering.
     * @type Boolean
     * @key_string vertexColorsEnabled
     */
    VERTEX_COLORS_ENABLED = 'vertexColorsEnabled',
    /**
     * Specifies the view perspective (from outside or from inside).
     * @type ViewPerspective
     */
    VIEW_PERSPECTIVE = 'viewPerspective',
    /**
     * Preserve drawing buffer on webgl context.
     * @type Boolean
     * @key_string webglPreserveDrawingBuffer
     */
    WEBGL_PRESERVE_DRAWINGBUFFER = 'webglPreserveDrawingbuffer',
  }

  /**
   * SETTING_CHANGED
   * @event SETTING_CHANGED
   */
  export class SettingChangedEvent extends WebVisEvent {
    setting: SettingStrings | ViewerSettingStrings;
    newValue: any;
    oldValue: any;
    /**
     * The SETTINGS_CHANGED event occurs if one of the settings is changed.
     * @param {SettingStrings | ViewerSettingStrings} setting - The name of the setting that has changed.
     * @param newValue - The new value of the Setting
     * @param oldValue - The old value of the Setting
     */
    constructor(
      setting: SettingStrings | ViewerSettingStrings,
      newValue: any,
      oldValue: any
    );
  }

  /**
   * The **SettingsAPI** provides basic functionalities to configure the 3D Space.
   */
  export interface SettingsAPI {
    /**
     * Changes the setting to the given value.
     *
     * @param setting    A name that specifies a particular setting
     * @param value      The new value for the setting
     *
     * @returns A boolean which indicates if the setting has changed
     */
    changeSetting<T extends SettingStrings | ViewerSettingStrings | string>(
      setting: T,
      value: ContextSettingType<T>
    ): boolean;
    /**
     * Applies the specified set of settings to the context.
     *
     * @param config - Settings to import
     */
    importConfig(config: {
      [key in SettingStrings | ViewerSettingStrings]?: any;
    }): void;
    /**
     * Returns the value of a setting.
     *
     * @param  setting The name of the setting that should be read
     *
     * @return The value of the specified setting
     */
    readSetting<T extends SettingStrings | ViewerSettingStrings | string>(
      setting: T
    ): ContextSettingType<T>;
    /**
     * Resets the value of a setting to the installation default.
     *
     * @param setting The name of the setting that should be reset.
     */
    resetSetting(setting: SettingStrings | ViewerSettingStrings): void;
    resetUserSettings(): void;
  }

  export type ContextSettingType<T> = T extends 'additionalCookies'
    ? string[]
    : T extends 'additionalRequestHeaders'
    ? {
        [key: string]: string;
      }
    : T extends 'additionalWSQueryParameters'
    ? {
        [key: string]: string;
      }
    : T extends 'annotationEditingEnabled'
    ? boolean
    : T extends 'arkitConfigs'
    ? any
    : T extends 'auxModeRecursiveSearch'
    ? boolean
    : T extends 'auxModeUncolorFacesOnLeave'
    ? boolean
    : T extends 'boosterURL'
    ? string
    : T extends 'cappingGeometryColor'
    ? string
    : T extends 'contextMenuFunction'
    ? (entries: ContextMenuEntry[]) => ContextMenuEntry[]
    : T extends 'contextMode'
    ? ContextMode
    : T extends 'customIconMap'
    ? {
        [key: string]: string;
      }
    : T extends 'customToolbarIconMap'
    ? any
    : T extends 'defaultQueryLinkDepth'
    ? number
    : T extends 'disableDefaultInteraction'
    ? boolean
    : T extends 'hubURL'
    ? string
    : T extends 'initialStateActivation'
    ? boolean
    : T extends 'language'
    ? string
    : T extends 'logLevel'
    ? LogLevel
    : T extends 'maxActiveSceneVolumeDiameter'
    ? number
    : T extends 'maxConcurrentDownloads'
    ? number
    : T extends 'measurementAngularTolerance'
    ? number
    : T extends 'measurementMaterialDensities'
    ? number
    : T extends 'modelviewPrintContentFunction'
    ? (
        context: ContextAPI,
        nodeID: number,
        modelViewID: number
      ) => Promise<string>
    : T extends 'modelviewPrintResourceNameFunction'
    ? (context: ContextAPI, nodeID: number) => Promise<string>
    : T extends 'notificationLogLevels'
    ? any
    : T extends 'parentSelectEnabled'
    ? boolean
    : T extends 'preferXHRWithCredentials'
    ? boolean
    : T extends 'sessionDeviceTags'
    ? string[]
    : T extends 'sessionForwardUrl'
    ? string
    : T extends 'SESSION_INTERACTIONS'
    ? any
    : T extends 'sessionMemberName'
    ? string
    : T extends 'skipSslVerify'
    ? boolean
    : T extends 'slamProviderType'
    ? any
    : T extends 'snapshotContentSelection'
    ? SnapshotRestoreOptions
    : T extends 'uriMap'
    ? URIMap
    : T extends 'xrEnabled'
    ? boolean
    : ViewerSettingType<T>;
  export type URIMap = {
    regex: string;
    replace: string;
  }[];

  export type ViewerSettingType<T> = T extends 'aaSetting'
    ? boolean
    : T extends 'backgroundColor'
    ? string | undefined | null
    : T extends 'defaultFieldOfView'
    ? number
    : T extends 'cappingEffectEdgeColor'
    ? string | undefined | null
    : T extends 'cappingEffectInnerColor'
    ? string | undefined | null
    : T extends 'cappingEffectEnabled'
    ? boolean
    : T extends 'colorizeEffect'
    ? boolean
    : T extends 'colorComparisonMatchingColor'
    ? string | undefined | null
    : T extends 'colorComparisonFirstColor'
    ? string | undefined | null
    : T extends 'colorComparisonSecondColor'
    ? string | undefined | null
    : T extends 'coordSys'
    ? FrontPlaneAxis
    : T extends 'DOUBLE_CLICK_ANIMATION_VOLUME_SCALE'
    ? number
    : T extends 'doubleClickTimeWindow'
    ? number
    : T extends 'doubleClickTimeWindow'
    ? number
    : T extends 'dynamicAuxContrastEnabled'
    ? boolean
    : T extends 'dynamicClippingEnabled'
    ? boolean
    : T extends 'dynamicClippingEnabled'
    ? boolean
    : T extends 'dynamicClippingDistance'
    ? number
    : T extends 'dynamicCOREnabled'
    ? boolean
    : T extends 'expandOnViewerSelection'
    ? boolean
    : T extends 'faceHighlightColor'
    ? string | undefined | null
    : T extends 'faceSelectionColor'
    ? string | undefined | null
    : T extends 'fitViewFactor'
    ? number
    : T extends 'flyNavigationSpeed'
    ? number
    : T extends 'focusOnDoubleClick'
    ? boolean
    : T extends 'frustumCulling'
    ? boolean
    : T extends 'gizmosEnabled'
    ? boolean
    : T extends 'gizmoScalingFactor'
    ? number
    : T extends 'gpuMemoryReleaseFactor'
    ? number
    : T extends 'initialFit'
    ? boolean
    : T extends 'initView'
    ? number[] | string
    : T extends 'mouseInvertZoomingDirection'
    ? boolean
    : T extends 'lightingEnvironment'
    ? ViewerLightingEnvironment
    : T extends 'lineHighlightColor'
    ? string | undefined | null
    : T extends 'lineSelectionColor'
    ? string | undefined | null
    : T extends 'maxDynamicClipDistance'
    ? number
    : T extends 'maxGPUMemory'
    ? number
    : T extends 'maxSRCCPUMemory'
    ? number
    : T extends 'navigationMode'
    ? NavigationMode
    : T extends 'navigationSampling'
    ? number
    : T extends 'navigationSpeedFactor'
    ? number
    : T extends 'navigationSpeedThrottleFactor'
    ? number
    : T extends 'drawingColor'
    ? string | undefined | null
    : T extends 'drawingMode'
    ? DrawingMode
    : T extends 'drawingSize'
    ? number
    : T extends 'preSelectionColor'
    ? string | undefined | null
    : T extends 'projectionType'
    ? CameraProjectionType
    : T extends 'renderServiceCanvasRatio'
    ? number
    : T extends 'renderAuxOnTop'
    ? boolean
    : T extends 'renderMode'
    ? RenderMode
    : T extends 'renderSetup'
    ? RenderSetup
    : T extends 'screenSpaceCoverageCalculationMethod'
    ? ScreenSpaceCoverageCalculationMethod
    : T extends 'selectionColor'
    ? string | undefined | null
    : T extends 'showAuxOnNavigation'
    ? boolean
    : T extends 'silhouetteEffectColor'
    ? string | undefined | null
    : T extends 'silhouetteEffect'
    ? boolean
    : T extends 'silhouetteEffectExclusiveEnabled'
    ? boolean
    : T extends 'smallFeatureCulling'
    ? boolean
    : T extends 'smallFeaturePixelThreshold'
    ? number
    : T extends 'soc'
    ? boolean
    : T extends 'spacemouseMultiplier'
    ? number
    : T extends 'topoGeometryColor'
    ? string | undefined | null
    : T extends 'topoGeometrySecondaryColor'
    ? string | undefined | null
    : T extends 'topoPointsEnabled'
    ? boolean
    : T extends 'turntableLowerVerticalLimit'
    ? number
    : T extends 'turntableUpperVerticalLimit'
    ? number
    : T extends 'turntableVerticalLimitsEnabled'
    ? boolean
    : T extends 'useDevicePixelRatio'
    ? boolean
    : T extends 'vertexColorsEnabled'
    ? boolean
    : T extends 'viewPerspective'
    ? ViewPerspective
    : T extends 'webglPreserveDrawingbuffer'
    ? boolean
    : any;
  export enum EntityType {
    VOID = 0,
    FACE = 1,
    EDGE = 2,
    POINT = 3,
  }
  export enum TopologyProperty {
    COLOR = 'color',
    HIGHLIGHTED = 'highlighted',
    SELECTED = 'selected',
  }
  export enum TopologyType {
    EDGE = 0,
    FACE = 1,
    POINT = 2,
    SHAPE = 3,
  }

  /**
   * @hidden
   */
  export interface ITopologyDataSelector {
    shapeInstanceID?: number;
    entityType?: EntityType;
    entityID?: number;
  }

  /**
   * The **TopologyAPI** provides multiple functionalities to operate on the Topology level of a Part.
   */
  export interface TopologyAPI {
    /**
     * Adds one or multiple Topology elements to the current selection.
     * @param {TopologyHandle | TopologyHandle[]} handle - A Topology Element or the list of Topology Elements which should be added to the current selection.
     */
    addTopologyToSelection(
      handle: TopologyHandle | TopologyHandle[]
    ): Promise<void>;
    /**
     * Clears the current Topology Selection.
     */
    clearTopologySelection(): Promise<void>;
    /**
     * Returns a list of all selected topology elements.
     * @returns {TopologyHandle[]} A List of all selected Topology elements.
     */
    getSelectedTopologyHandles(): Array<TopologyHandle>;
    /**
     * Returns the type of the given topology element
     * @param handle - The TopologyHandle.
     * @returns {TopologyType} The type of the given topology element
     */
    getTopologyType(handle: TopologyHandle): TopologyType;
    /**
     * Checks if the specified Topology Element is part of the current selection.
     * @param {TopologyHandle} handle - The topology element which should be checked if it selected.
     * @returns {boolean} A boolean value which indicates if the specified Topology Element is part of the current selection or not.
     */
    isTopologySelected(handle: TopologyHandle): boolean;
    /**
     * Maps the given original topology handles to webvis internal topology handles.
     * @param {number} nodeID - The Node which specifies the Part the topology relates to.
     * @param {TopologyHandle[]} handles - A list of original topology handles.
     * @returns Promise<Array<TopologyHandle|undefined>> - A list of the corresponding webvis internal topology handles.
     */
    mapOriginalToInternalTopologyHandles(
      nodeID: number,
      handles: OriginalTopologyHandle[]
    ): Promise<Array<TopologyHandle | undefined>>;
    /**
     * Maps the given webvis internal topology handles to original topology handles.
     * @param {TopologyHandle[]} handles - A list of webvis internal topology handles.
     * @returns Promise<Array<OriginalTopologyHandle|undefined>> - A list of the corresponding original topology handles.
     */
    mapInternalToOriginalTopologyHandles(
      handles: TopologyHandle[]
    ): Promise<Array<OriginalTopologyHandle | undefined>>;
    /**
     * Removes one or multiple Topology elements to the current selection.
     * @param {TopologyHandle | TopologyHandle[]} handle - A Topology Element or a list of Topology Elements which should be removed from the current selection.
     */
    removeTopologyFromSelection(
      handle: TopologyHandle | TopologyHandle[]
    ): Promise<void>;
    /**
     * Sets a Property of one or multiple Topology Elements.
     * @param {TopologyHandle | TopologyHandle[]} handle
     * @param {TopologyProperty} property - The property which should be set.
     * @param value{TopologyPropertyTypeMap[TopologyProperty]} - The new property value.
     */
    setTopologyProperty<T extends keyof TopologyPropertyTypeMap>(
      handle: TopologyHandle | TopologyHandle[],
      property: T,
      value: TopologyPropertyTypeMap[T]
    ): Promise<PromiseSettledResult<void>[]>;
    /**
     * Selects the specified Topology Elements.
     * @param {TopologyHandle | TopologyHandle[]} handle - A Topology Element or a list of Topology Elements to select.
     */
    setTopologySelection(
      handle: TopologyHandle | TopologyHandle[]
    ): Promise<void>;
  }
  /**
   * The **OriginalTopologyHandle** holds a Shape and/or Entity identifier from the original CAD File
   */
  export type OriginalTopologyHandle = {
    /**
     * The Entity identifier from the original CAD File
     */
    entityID: number;
    /**
     * The Shape identifier from the original CAD File
     */
    shapeID?: string | undefined;
  };

  /**
   * The **TopologyHandle** holds a Shape and/or Entity identifier.
   */
  export type TopologyHandle = {
    entityID?: number;
    entityType?: EntityType;
    shapeInstanceID: number;
  };
  export type TopologyPropertyTypeMap = {
    color: number[];
    selected: boolean;
    highlighted: boolean;
  };

  export interface UtilityAPI {
    /**
     * Creates a new BoxVolume object.
     * @param {[number, number, number]} min -
     * @param {[number, number, number]} max -
     * @returns {BoxVolume} A new Box Volume
     */
    createBoxVolume(
      min?: [number, number, number],
      max?: [number, number, number]
    ): BoxVolume;
  }

  /**
   * VARIANTS_CHANGED
   * @event VARIANTS_CHANGED
   */
  export class VariantChangedEvent extends WebVisEvent {
    variant: number;
    enabled: boolean;
    /**
     * The VARIANTS_CHANGED event occurs if the selected variants change.
     * @param variant        The id of the changed variant
     * @param enabled     The new enabled state of the changed variant.
     */
    constructor(variant: number, enabled: boolean);
  }

  export interface VariantsAPI {
    /**
     *
     * @param nodeId The ID of the Node.
     * @returns True, if the Node is Part of an enabled Variant. False otherwise.
     */
    isNodePartOfEnabledVariant(nodeId: number): Promise<boolean>;
    /**
     *
     * @param nodeId The ID of the Node.
     * @returns The Variant(s) for a given nodeID.
     */
    requestVariants(nodeId: number): Promise<VariantProperties[]>;
    /**
     * Enables or disables a given Variant.
     * @param variant The ID of the Variant.
     * @param enabled The enabled state.
     */
    setVariantEnabled(variant: number, enabled: boolean): void;
  }
  export type VariantProperties = {
    id: number;
    name: string;
    enabled: boolean;
  };
  export type VersionInfo = {
    build: string;
    date: string;
    platform: string;
    revisionHare: string;
    revisionWebVis: string;
    version: string;
    pkg: string;
  };
  /**
   * Available projection types.
   */
  export enum CameraProjectionType {
    PERSPECTIVE = 0,
    ORTHOGRAPHIC = 1,
  }
  export enum FrontPlaneAxis {
    POS_X_POS_Y = 'xy',
    NEG_X_POS_Y = '-xy',
    POS_X_NEG_Y = 'x-y',
    NEG_X_NEG_Y = '-x-y',
    POS_X_POS_Z = 'xz',
    NEG_X_POS_Z = '-xz',
    POS_X_NEG_Z = 'x-z',
    NEG_X_NEG_Z = '-x-z',
    POS_Y_POS_Z = 'yz',
    NEG_Y_POS_Z = '-yz',
    POS_Y_NEG_Z = 'y-z',
    NEG_Y_NEG_Z = '-y-z',
  }
  export enum HoveringLabel {
    NODE_LABEL = 0,
    RESOURCE_LABEL = 1,
  }
  export enum RenderSetup {
    HYBRID = 'hy_rmcull',
    LOCAL = 'cl_webgl1',
    REMOTE = 'rm_col_id_cull',
  }
  export enum ScreenSpaceCoverageCalculationMethod {
    RADIAL_VEC_APPROX = 0,
    BBOX_AREA_APPROX = 1,
    BBOX_AREA_COMPUTATION = 2,
    BBOX_WEIGHTED_AREA_COMPUTATION = 3,
  }
  export enum ViewDirection {
    TOP = 0,
    BOTTOM = 1,
    FRONT = 2,
    BACK = 3,
    LEFT = 4,
    RIGHT = 5,
    TOP_BACK_RIGHT = 6,
    TOP_FRONT_RIGHT = 7,
    TOP_BACK_LEFT = 8,
    TOP_FRONT_LEFT = 9,
    BOTTOM_BACK_RIGHT = 10,
    BOTTOM_FRONT_RIGHT = 11,
    BOTTOM_BACK_LEFT = 12,
    BOTTOM_FRONT_LEFT = 13,
    FRONT_LEFT = 14,
    FRONT_RIGHT = 15,
    BACK_LEFT = 16,
    BACK_RIGHT = 17,
    FRONT_TOP = 18,
    FRONT_BOTTOM = 19,
    BACK_TOP = 20,
    BACK_BOTTOM = 21,
    RIGHT_TOP = 22,
    RIGHT_BOTTOM = 23,
    LEFT_TOP = 24,
    LEFT_BOTTOM = 25,
    CURRENT = 26,
  }
  export enum ViewerLightingEnvironment {
    HEADLIGHT = 0,
    FOUR_POINT_LIGHTING = 1,
    FIVE_POINT_LIGHTING = 2,
  }
  export enum ViewPerspective {
    INSIDE = 'insideView',
    OUTSIDE = 'outsideView',
  }

  /**
   * MODEL_RENDERED
   * @event MODEL_RENDERED
   */
  export class ModelRenderedEvent extends WebVisEvent {
    /**
     * The MODEL_RENDERED event occurs if model is rendered.
     */
    constructor();
  }

  /**
   * PROGRESS_CHANGED
   * @event PROGRESS_CHANGED
   */
  export class ProgressChangedEvent extends WebVisEvent {
    progressState: ProgressState;
    constructor(progressState: ProgressState);
  }

  /**
   * VIEW_CHANGED
   * @event VIEW_CHANGED
   */
  export class ViewChangedEvent extends WebVisEvent {
    viewer: ViewerAPI;
    matrix: Float32Array;
    /**
     * The BACKGROUND_CLICKED event occurs if the Background is clicked.
     * @param viewer The viewer where the change happend
     * @param matrix The new view matrix
     */
    constructor(viewer: ViewerAPI, matrix: Float32Array);
  }

  /**
   * VIEWER_CREATED
   * @event VIEWER_CREATED
   */
  export class ViewerCreatedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
  }

  /**
   * VIEWER_NAVIGATION_ENDED
   * @event VIEWER_NAVIGATION_ENDED
   */
  export class ViewerNavigationEndedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
  }

  /**
   * VIEWER_NAVIGATION_STARTED
   * @event VIEWER_NAVIGATION_STARTED
   */
  export class ViewerNavigationStartedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
  }

  /**
   * VIEWER_REMOVED
   * @event VIEWER_REMOVED
   */
  export class ViewerRemovedEvent extends WebVisEvent {
    viewerId: string;
    constructor(viewerId: string);
  }

  /**
   * VIEWER_SETTING_CHANGED
   * @event VIEWER_SETTING_CHANGED
   */
  export class ViewerSettingChangedEvent extends WebVisEvent {
    viewerSetting: string;
    value: any;
    viewer: ViewerAPI;
    /**
     * The VIEWER_SETTING_CHANGED event occurs if one of the settings is changed.
     * @param viewerSetting  The name of the setting that has changed.
     * @param value          The new value of the setting.
     * @param viewer         The viewer on which the setting was changed.
     */
    constructor(viewerSetting: string, value: any, viewer: ViewerAPI);
  }

  /**
   * VIEWPORTSIZE_CHANGED
   * @event VIEWPORTSIZE_CHANGED
   */
  export class ViewportChangedEvent extends WebVisEvent {
    width: number;
    height: number;
    /**
     * This event signals a that the viewport size has changed
     * @param {number} width The new width of the viewport
     * @param {number} height The new height of the viewport
     */
    constructor(width: number, height: number);
  }

  export interface ViewerAPI
    extends ViewerDrawingAPI,
      ViewerInteractionAPI,
      ViewerGizmoAPI,
      ViewerHighlightAPI,
      ViewerPolylineAPI,
      ViewerUserGeometryAPI {
    getContext(): ContextAPI;
    getID(): string;
    destroy(): void;
    /**
     * Changes the viewer setting with the given name to the given value.
     *
     * @param viewerSetting Specifies a particular viewer setting which one would like to change.
     * @param value         A new value for the specified setting.
     * @returns A boolean which indicates if the setting has changed
     */
    changeSetting<T extends ViewerSettingStrings | string>(
      viewerSetting: T,
      value: ViewerSettingType<T>
    ): boolean;
    /**
     * Returns the value of a viewer setting.
     *
     * @param  viewerSetting The name of a particular setting whose value one wants to read
     *
     * @return               The value of the specified setting
     */
    readSetting<T extends ViewerSettingStrings | string>(
      viewerSetting: T
    ): ViewerSettingType<T>;
    /**
     * Resets the value of a viewer setting.
     *
     * @param viewerSetting The name of the viewer setting that should be reset.
     */
    resetSetting(viewerSetting: string): void;
    /**
     * Positions the camera such that the whole geometry is fitting into the view. The view and up
     * parameter allow to define a viewing direction and roll for the resulting camera pose.
     *
     * @param view Defines the desired viewing direction
     * @param up   Defines the desired camera orientation in conjunction with the viewing direction
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitView(
      view?: [number, number, number] | Float32Array,
      up?: [number, number, number] | Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Positions the camera such that the node’s bounding box is fitting into the view. The view and up
     * parameter allow to define a viewing direction and roll for the resulting camera pose.
     *
     * @param nodeID The ID of the node on which one wants to fit the view
     * @param view   The direction in which the camera will look on the node
     * @param up     The orientation in which the camera will look on the node
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToNode(
      nodeID: number,
      view?: [number, number, number] | Float32Array,
      up?: [number, number, number] | Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Positions the camera such that the aux node is fitting into the view.
     *
     * @param nodeID The ID of the node on which one wants to fit the view
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToAuxNode(nodeID: number, transitionTime?: number): Promise<void>;
    /**
     * Positions the camera such that the view is focused onto the given volume. The view and up
     * parameter allow to define a viewing direction and roll for the resulting camera pose.
     *
     * @param volume A particular volume on which the view will be fitted
     * @param view   Specifies the direction in which the camera will look on the volume
     * @param up     Specifies the orientation in which the camera will look on the volume
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToVolume(
      volume: BoxVolume,
      view?: [number, number, number] | Float32Array,
      up?: [number, number, number] | Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Positions the camera such that the view is focused onto the given rectangle.
     * @param {number} x - Specifies the X-Coordinate of the 2D screen space Rectangle.
     * @param {number} y - Specifies the Y-Coordinate of the 2D screen space Rectangle.
     * @param {number} width - Specifies the width of the 2D screen space Rectangle.
     * @param {number} height - Specifies the height of the 2D screen space Rectangle.
     * @param {boolean} [transitionTime=1000] - Defines the transition time for the camera movement.
     */
    fitViewToRectangle(
      x: number,
      y: number,
      width: number,
      height: number,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Positions the camera such that it looks from a specific direction.
     * @param {ViewDirection} [direction=ViewDirection.CURRENT] The direction to fit.
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToDirection(
      direction?: ViewDirection,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Positions the camera such that it looks from the specified direction onto the specified volume.
     * @param {BoxVolume} volume The volume on which the camera will be fitted
     * @param {ViewDirection} [direction=ViewDirection.CURRENT] The direction to fit.
     * @param {number} [transitionTime=100]   Defines the transition time for the camera movement
     */
    fitViewToVolumeFromDirection(
      volume: BoxVolume,
      direction?: ViewDirection,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Returns the center of rotation being the point around which the camera rotates around.
     */
    getCenterOfRotation(): Float32Array;
    /**
     * Sets the center of rotation being the point around which the inspection camera rotates. If no
     * center parameter is supplied the center of rotation is set to the center of all currently loaded
     * models.
     *
     * @param center The center of rotation
     */
    setCenterOfRotation(
      center?: [number, number, number] | Float32Array
    ): Promise<void>;
    /**
     * Sets the camera to the initial position
     */
    restoreInitView(): void;
    /**
     * Sets the camera position, its target and the up-vector. If the up-vector is not defined, the
     * previous up-vector is kept.
     *
     * @param position Specifies the new position or center of the camera
     * @param target   Specifies the point on which the camera will look
     * @param upVector Specifies the new orientation of the camera
     * @param {number} [transitionTime=0]   Defines the transition time for the camera movement
     */
    setView(
      position: [number, number, number] | Float32Array,
      target: [number, number, number] | Float32Array,
      upVector?: [number, number, number] | Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Sets the camera view matrix.
     *
     * @param matrix The new view matrix for the camera
     * @param {number} [transitionTime=0]   Defines the transition time for the camera movement
     */
    setViewMatrix(
      matrix:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Animates to the given viewmatrix
     *
     * @param matrix The new view matrix for the camera
     * @param {number} [transitionTime=600]   Defines the transition time for the camera movement
     */
    animateViewToViewmatrix(
      matrix:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * Return the current Camera position
     *
     * @returns {Float32Array} The current Camera position
     */
    getCameraPosition(): [number, number, number] | Float32Array;
    /**
     * Return the current Camera projection tyxpe
     *
     * @returns {CameraProjectionType} The current Camera projection tyxpe
     */
    getCameraProjectionType(): CameraProjectionType;
    /**
     * Returns a 4x4 rotation matrix which is used to transform the internal default right-handed coordinate system
     * with X and Y as front plane axis to the configured one.
     *
     * @return The toCoordinateSystem Matrix
     */
    getToCoordinateSystemMatrix():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    /**
     * Returns the current view matrix.
     *
     * @return The current view matrix of the camera
     */
    getViewMatrix():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    /**
     * Sets the current projection matrix.
     *
     * @param matrix The new projection matrix
     */
    setProjectionMatrix(
      matrix:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array
    ): void;
    /**
     * Returns the current projection matrix.
     *
     * @return The current projection matrix
     */
    getProjectionMatrix():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    /**
     * Flips the auxiliaries with respect to the current view
     */
    flipAuxToView(): void;
    /**
     * Toggles the state of the 3D navigation (on or off).
     *
     * @param {boolean} flag
     */
    enableNavigation(flag?: boolean): void;
    /**
     * Returns a List of all TopologyHandles which ared included & overlapped by the specified 2D screen space Rectangle.
     * @param {number} x - Specifies the X-Coordinate of the 2D screen space Rectangle.
     * @param {number} y - Specifies the Y-Coordinate of the 2D screen space Rectangle.
     * @param {number} width - Specifies the width of the 2D screen space Rectangle.
     * @param {number} height - Specifies the height of the 2D screen space Rectangle.
     * @returns {Promise<TopologyHandle[]>} List of all TopologyHandles which are included & overlapped by the specified 2D screen space Rectangle.
     */
    requestTopologyHandlesByRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): Promise<TopologyHandle[]>;
    /**
     * Returns a List of all NodeIds which are included or overlapped by the specified 2D screen space Rectangle.
     * @param {number} x - Specifies the X-Coordinate of the 2D screen space Rectangle.
     * @param {number} y - Specifies the Y-Coordinate of the 2D screen space Rectangle.
     * @param {number} width - Specifies the width of the 2D screen space Rectangle.
     * @param {number} height - Specifies the height of the 2D screen space Rectangle.
     * @param {boolean} [includeOverlappingNodes=false] - Specifies that the result should include Nodes which overlap the specified 2D screen space Rectangle as well.
     * @returns {Promise<number[]>} List of all NodeIds which are included or overlapped by the specified 2D screen space Rectangle.
     */
    requestNodeIdsByRect(
      x: number,
      y: number,
      width: number,
      height: number,
      includeOverlappingNodes?: boolean
    ): Promise<number[]>;
    /**
     * Takes a screenshot from the current view.
     *
     * @deprecated takeScreenshot is deprecated, please use [[requestScreenshot]] instead
     * @param {(dataUrl : string) => void} callback - A callback containing the result which is executed after all Rendering operations are finished.
     * @param {"image/png" | "image/jpeg"} [mimeType="image/png"] - A string indicating the image format. The default type is image/png.
     * @param {number} [width=undefined] - The width of the requested screenshot. If not specified it uses the width of the current view.
     * @param {number} [height=undefined] - The height of the requested screenshot. If not specified it uses the height of the current view.
     */
    takeScreenshot(
      callback: (dataUrl: string) => void,
      mimeType?: string,
      width?: number,
      height?: number
    ): void;
    /**
     * Requests a screenshot from the current view.
     *
     * @param {number} [width=undefined] - The width of the requested screenshot. If not specified it uses the width of the current view.
     * @param {number} [height=undefined] - The height of the requested screenshot. If not specified it uses the height of the current view.
     * @param {"image/png" | "image/jpeg"} [mimeType="image/png"] - A string indicating the image format. The default type is image/png.
     * @param {boolean} [resetCanvasSize=false] -
     *
     * @returns {Promise<string>>} - A string containing the requested screenshot as dataUrl.
     */
    requestScreenshot(
      width?: number,
      height?: number,
      mimeType?: 'image/png' | 'image/jpeg',
      resetCanvasSize?: boolean
    ): Promise<string>;
    /**
     * @hidden
     */
    getCoordSys(): FrontPlaneAxis;
    /**
     * @hidden
     */
    getCoordSysUpVector(): [number, number, number] | Float32Array;
    /**
     * @hidden
     */
    getCoordSysRightVector(): [number, number, number] | Float32Array;
    /**
     * @hidden
     */
    getCanvasHeight(): number;
    /**
     * @hidden
     */
    getCanvasWidth(): number;
    /**
     * @hidden
     */
    getCanvasElement(): HTMLCanvasElement;
    /**
     * @hidden
     */
    getBoundingClientRect(): ClientRect;
    /**
     * @hidden
     */
    unprojectPoint(inVector: Float32Array, outVector: Float32Array): void;
    /**
     * @hidden
     */
    trimSegmentToFrustum(
      pt0: Float32Array,
      pt1: Float32Array,
      ignoreNear?: boolean
    ): boolean;
    /**
     * @hidden
     */
    projectPoint(inVector: Float32Array, outVector: Float32Array): void;
    /**
     * @hidden
     */
    projectPointToCanvas(inVector: Float32Array, outVector: Float32Array): void;
    /**
     * @hidden
     */
    unprojectPointFromCanvas(
      inVector: Float32Array,
      outVector: Float32Array
    ): void;
    /**
     * @hidden
     */
    getVectoresForDirection(
      direction: number,
      view: Float32Array,
      up: Float32Array
    ): void;
    /**
     * @hidden
     */
    rotateCoordSystem(
      frontPlaneStr: FrontPlaneAxis,
      outMatrix:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array
    ):
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    /**
     * @hidden
     */
    resetPerspectiveFOV(): void;
    /**
     * @hidden
     */
    setDynamicClippingPlaneDistance(value: number): void;
    /**
     * @hidden
     */
    enableDynamicClippingPlane(flag: boolean): void;
    /**
     * @hidden
     */
    animateViewToVolume(
      volume?: BoxVolume,
      view?: Float32Array,
      up?: Float32Array,
      transitionTime?: number
    ): Promise<void>;
    /**
     * @hidden
     */
    focusOnDoubleClick(): boolean;
    /**
     * @hidden
     */
    isNavigationEnabled(): boolean;
    /**
     * @hidden
     */
    setUserInputActive(flag: boolean): void;
    /**
     * @hidden
     */
    highlightScope(nodeID: number): void;
    /**
     * @hidden
     */
    unhighlightScope(nodeID: number): void;
    /**
     * @hidden
     */
    setVolatileHighlightEnabled(flag: boolean): void;
    /**
     * @hidden
     */
    openRenderServiceDebugPage(): void;
    /**
     * The viewer is destroyed and reinitialized with renderSetup selection
     */
    reset(): void;
  }

  export type ActiveItemInfo = {
    type: NodeType;
    id: number;
  };
  export type ProgressState = {
    numberOfUploads: number;
    numberOfDownloads: number;
    numberOfUpdateStates: number;
    downloadProgress: number;
    renderingProgress: number;
    isProcessing: boolean;
  };
  export enum DrawingMode {
    BRUSH = 0,
    PEN = 1,
  }

  /**
   * The **ViewerDrawingAPI** provides basic functionalities to control the 2D Drawing Mode and the
   * processed Output.
   */
  export interface ViewerDrawingAPI {
    /**
     * Leaves the 2D Drawing Mode and discards all drawings.
     */
    cancelDrawingMode(): void;
    /**
     * Enters the 2D drawing Mode where you can draw on top of your 3D Model.
     */
    enterDrawingMode(): void;
    /**
     * Leaves the 2D Drawing Mode and returns the processed 2D drawing data which can be used to create
     * a Drawing with the help of the [[DrawingAPI]].
     * @param options - Options to configure the result of the processing.
     * @returns The processed 2D drawing data.
     */
    leaveDrawingMode(
      options?: ViewerDrawingProcessOptions
    ): Promise<ViewerDrawingResult | undefined>;
  }
  export type ViewerDrawingGeometry = {
    /**
     * Specifies the color of the Geometry.
     */
    color: [number, number, number, number];
    /**
     * Specifies the vertex positions of the Geometry.
     */
    positions: number[];
    /**
     * Specifies primitive type of the Geometry.
     */
    primitiveType: number;
    /**
     * Specifies the volume of the Geometry.
     */
    volume: [number, number, number, number, number, number];
    /**
     * Specifies the width of the Geometry.
     * @default 1
     */
    width?: number;
  };
  export type ViewerDrawingProcessOptions = {
    /**
     * Specifies if the result contains a thumbnail of the Drawing.
     * @default true
     */
    thumbnail?: boolean;
    /**
     * Specifies the width of the thumbnail.
     * If the thumbnail height or width is not set, the current viewer size is used.
     * @default undefined
     */
    thumbnailWidth?: number;
    /**
     * Specifies the height of the thumbnail.
     * If the thumbnail height or width is not set, the current viewer size is used.
     * @default undefined
     */
    thumbnailHeight?: number;
    /**
     * Specifies the output primitive type of the Brush-Drawings.
     * @default "triangleStrip"
     */
    brushPrimitiveType?: 'triangleStrip';
    /**
     * Specifies the output primitive type of the Pen-Drawings.
     * @default "triangleStrip"
     */
    penPrimitiveType?: 'triangleStrip' | 'lineStrip';
  };

  export type ViewerDrawingResult = {
    geometries: ViewerDrawingGeometry[];
    thumbnail: string;
    version: {
      major: number;
      minor: number;
      patch: number;
    };
  };
  export enum GizmoTransformationMode {
    TRANSLATION = 1,
    ROTATION = 2,
    TRANSLATION_ROTATION = 3,
    SCALING = 4,
    SCALING_ROTATION = 6,
  }
  export enum GizmoType {
    NONE = 0,
    TRANSFORMATION = 1,
    CLIP_PLANE = 2,
    SELECTION_BOX = 3,
    TRANSFORMATION_BOX = 4,
    CLIP_ROOM_BOX = 5,
    COR = 6,
    ROTATION_SPHERE = 7,
    LINE_MARKER = 8,
    POINT_MARKER = 9,
  }

  /**
   * ACTIVE_ITEM
   * @event ACTIVE_ITEM
   */
  export class ActiveItemEvent extends WebVisEvent {
    itemID: number;
    itemType: NodeType;
    viewer: ViewerAPI;
    /**
     * The ACTIVE_ITEM event indicates a change to the current active item.
     * @param itemID        The ID of the item
     * @param itemType      The type of the active item
     * @param viewer        The viewer to which the active item relates.
     */
    constructor(itemID: number, itemType: NodeType, viewer: ViewerAPI);
  }

  /**
   * VIEWER_GIZMO_CHANGED
   * @event VIEWER_GIZMO_CHANGED
   */
  export class ViewerGizmoChangedEvent extends WebVisEvent {
    gizmoType: GizmoType;
    viewer: ViewerAPI;
    /**
     * The VIEWER_GIZMO_CHANGED event indicates a change to current gizmo.
     * @param {GizmoType} gizmoType     The type of the currently visible Gizmo.
     * @param {ViewerAPI} viewer        The viewer where the gizmo change has happened.
     */
    constructor(gizmoType: GizmoType, viewer: ViewerAPI);
  }

  /**
   * @event VIEWER_GIZMO_MODE_CHANGED
   */
  export class ViewerGizmoModeChangedEvent extends WebVisEvent {
    gizmoMode: GizmoTransformationMode;
    /**
     * The VIEWER_GIZMO_CHANGED event occurs if the transformation mode of the current Gizmo changed.
     * @param {GizmoType} gizmoMode     The transformation mode of the current Gizmo.
     */
    constructor(gizmoMode: GizmoTransformationMode);
  }

  export interface ViewerGizmoAPI {
    getCurrentGizmoType(): GizmoType;
    getAvailableGizmoTransformationModes(): number;
    setGizmoTransformationMode(mode: GizmoTransformationMode): void;
    getGizmoTransformationMode(): GizmoTransformationMode;
    showSelectionBoxGizmo(
      size?: [number, number, number] | Float32Array,
      transform?:
        | [
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number,
            number
          ]
        | Float32Array
    ): void;
    showSelectionBoxGizmoFromVolume(volume?: BoxVolume): void;
    showSelectionTransformationGizmo(nodeIds: number[]): void;
    showClippingBoxGizmo(clipRoomID: number): void;
    hideGizmo(): void;
    createCollectionFromGizmo(
      includeOverlappingNodes: boolean
    ): Promise<number>;
    getGizmoSize(): [number, number, number] | Float32Array;
    getGizmoTransform():
      | [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      | Float32Array;
    setCORGizmoVisible(flag: boolean): void;
    showPointMarker(
      position: [number, number, number] | Float32Array,
      index?: number
    ): void;
    showAxisMarker(
      values: [number, number, number] | Float32Array,
      scale?: number,
      index?: number
    ): void;
    hidePointMarker(index?: number): void;
    hideAllPointMarkers(): void;
    hideAllLineMarkers(): void;
    hideAllMarkers(): void;
    getActiveItem(): ActiveItemInfo;
    setActiveItem(id: number, type: NodeType): void;
  }

  export interface ViewerHighlightAPI {
    /**
     * Enable highlighting of the entity , which matches the attributes informed in the viewerDataSelector
     *
     * @param handle : IViewerHighlightSelector
     *
     * @param highlightParameters
     * @return the highlightHandle, which it reqed to remove the highlighting
     */
    highlightEntity(
      handle: ITopologyDataSelector,
      highlightParameters?: ViewerHighlightParameters
    ): Promise<number>;
    highlightArc(
      pickedPt1: [number, number, number] | Float32Array,
      pickedPt3: [number, number, number] | Float32Array,
      center: [number, number, number] | Float32Array,
      axis: [number, number, number] | Float32Array,
      angle: number,
      measurementID: number
    ): number;
    highlightBBox(
      center: [number, number, number] | Float32Array,
      size: [number, number, number] | Float32Array
    ): number;
    highlightPoint(
      position: [number, number, number] | Float32Array,
      markerIndex: number
    ): void;
    highlightLine(values: number[], scale: number, markerIndex: number): void;
    /**
     * Disable highlighting for the handle
     *
     * @param highlightHandle : number
     */
    dehighlightEntity(highlightHandle?: number): void;
  }
  export type ViewerHighlightParameters = {
    color?: [number, number, number, number] | Float32Array;
    clipHighlight?: boolean;
    facesHighlightOnTop?: boolean;
    exclusiveClipplanes?: Array<number>;
  };
  export enum PointerActionTrigger {
    NONE = 0,
    FIRST = 1,
    SECOND = 2,
    THIRD = 3,
    WHEEL = 4,
    TOUCH = 5,
  }
  export enum PointerActionType {
    NONE = 0,
    CLICKED = 1,
    PRESSED = 2,
    RELEASED = 3,
    DOUBLECLICKED = 4,
    TOUCH_PICKED = 5,
    TOUCH_PRESSED = 6,
    TOUCH_DOUBLE_PICKED = 7,
    ANY = 8,
  }

  /**
   * BACKGROUND_CLICKED
   * @event BACKGROUND_CLICKED
   */
  export class BackgroundClickedEvent extends WebVisEvent {
    originalEvent: Event;
    /**
     * The BACKGROUND_CLICKED event occurs if the Background is clicked.
     * @param originalEvent      The original mouse event
     */
    constructor(originalEvent: Event);
  }

  /**
   * NODE_CLICKED
   * @event NODE_CLICKED
   */
  export class NodeClickedEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_CLICKED event occurs if one of the Nodes is clicked.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent      The original mouse event
     */
    constructor(
      targetNodeID: number,
      pointerInfo: IPointerInfo,
      originalEvent: Event
    );
  }

  /**
   * NODE_POINTER_ENTER
   * @event NODE_POINTER_ENTER
   */
  export class NodePointerEnterEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_POINTER_ENTER event occurs if the mouse pointer enters one of the Nodes.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent     The original mouse event
     */
    constructor(
      targetNodeID: number,
      pointerInfo: IPointerInfo,
      originalEvent: Event
    );
  }

  /**
   * NODE_POINTER_OUT
   * @event NODE_POINTER_OUT
   */
  export class NodePointerOutEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_POINTER_OUT event occurs if the mouse pointer leaves one of the Nodes.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent     The original mouse event
     */
    constructor(
      targetNodeID: number,
      pointerInfo: IPointerInfo,
      originalEvent: Event
    );
  }

  /**
   * NODE_POINTER_OVER
   * @event NODE_POINTER_OVER
   */
  export class NodePointerOverEvent extends WebVisEvent {
    targetNodeID: number;
    pointerInfo: IPointerInfo;
    originalEvent: Event;
    /**
     * The NODE_POINTER_OVER event occurs if the mouse pointer moves over one of the Nodes.
     * @param targetNodeID      The ID of the target Node.
     * @param pointerInfo       Additional Pointer Information.
     * @param originalEvent     The original mouse event
     */
    constructor(
      targetNodeID: number,
      pointerInfo: IPointerInfo,
      originalEvent: Event
    );
  }

  export interface IClickResult extends ITopologyDataSelector {
    normalizedPointerCoords: [number, number] | Float32Array;
    canvasCoords: [number, number] | Float32Array;
    position: [number, number, number] | Float32Array;
    normal: [number, number, number] | Float32Array;
    drawableID: number;
    pickListener: any;
    subMesh: number;
    dataURI: string;
    meshID: string;
    vertexID: number;
    collectionID: number;
    selectedTarget: string;
    selectedValue: any;
    selectedTargetName: string;
    arcInfo: ArcMeasurementInfo;
    trigger: PointerActionTrigger;
    actionType: PointerActionType;
    nodeID: number;
    targetNodeID: number;
    viewer: ViewerAPI;
    /**
     * @deprecated requestTopologyDataSelector is deprecated, please use [[requestTopologyHandle]] instead.
     */
    requestTopologyDataSelector(): Promise<ITopologyDataSelector>;
    requestTopologyHandle(): Promise<TopologyHandle>;
    isPoint(): boolean;
    isFace(): boolean;
    isEdge(): boolean;
    getPointerInfo(): IPointerInfo;
  }

  export interface IPointerInfo {
    normalizedPointerCoords: [number, number] | Float32Array;
    canvasCoords: [number, number] | Float32Array;
    position: [number, number, number] | Float32Array;
    normal: [number, number, number] | Float32Array;
    actionType: PointerActionType;
    nodeID: number;
    targetNodeID: number;
    viewer: ViewerAPI;
    requestTopologyHandle(): Promise<TopologyHandle | undefined>;
  }
  export interface ViewerInteractionAPI {
    enableSnapping(useSnapping: boolean): void;
    isSnappingEnabled(): boolean;
  }

  export type InteractionEventData = {
    event: Event;
    pointerX: number;
    pointerY: number;
    normalizedPointerX: number;
    normalizedPointerY: number;
    trigger: PointerActionTrigger;
    type: PointerActionType;
    timestamp: number;
    delta: number;
    pointerOutsideCanvas: boolean;
    viewer: ViewerAPI;
  };
  export enum NavigationMode {
    WEBVIS = 'WEBVIS',
    DESKVIEW = 'DESKVIEW',
    TURNTABLE = 'TURNTABLE',
    FLY = 'FLY',
    D_CAD = 'D_CAD',
  }

  /**
   * The **ViewerPolylineAPI** provides basic functionalities to create and visualize Polylines.
   *
   * **Example**
   * ```typescript#
   *
   * // Get an instance of the ContextAPI & ViewerAPI
   * const theContext : ContextAPI = webvis.getContext(),
   *       theViewer  : ViewerAPI  = theContext.getViewer();
   *
   * // Create a list of 3D positions which defines the Polyline
   * const linePositions : number[] = [
   *  0, 0, 0,
   *  1, 0, 0,
   *  2, 0, 0
   * ];
   *
   * // Create a red Polyline with the given linePositions and a width of 6 pixels
   * const polylineId : number = theViewer.createPolyline( linePositions , {
   *     color: [1, 0, 0, 1],
   *     width: 6
   * });
   *
   * // Change the color of the Polyline to green
   * theViewer.changePolyline( polylineId, {
   *     color: [0, 1, 0, 1]
   * };
   *
   * // Removes the Polyline
   * theViewer.removePolyline(polylineId)
   * ```
   */
  export interface ViewerPolylineAPI {
    /**
     * Creates a new Polyline with the specified positions and properties.
     * @param positions - List of 3D positions which defines the Polyline.
     * @param properties - The properties of the Polyline.
     */
    createPolyline(
      positions: number[],
      properties?: PolylineProperties
    ): number;
    /**
     * Changes the properties of the Polyline with the specified Id.
     * @param polylineId - The Id of the Polyline which should be removed.
     * @param properties - The properties which should be changed.
     */
    changePolyline(polylineId: number, properties: PolylineProperties): void;
    /**
     * Removes the Polyline with the specified Id.
     * @param polylineId - The Id of the Polyline which should be removed.
     */
    removePolyline(polylineId: number): void;
  }
  export type PolylineProperties = {
    /**
     * Specifies the color of the Polyline.
     * @default [0,0,0,1]
     */
    color?: [number, number, number, number];
    /**
     * Specifies the enabled state of the Polyline.
     * @default false
     */
    enabled?: boolean;
    /**
     * Specifies the transform matrix of the Polyline.
     * @default identity
     */
    transform?: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ];
    /**
     * Specifies the width of the Polyline.
     * @default 1
     */
    width?: number;
  };

  export interface ViewerUserGeometryAPI {
    createGeometry(userGeoData: UserGeometryData): number;
    updateGeometry(id: number, data: UserGeometryData): void;
    removeGeometry(id: number): void;
  }
  export type UserGeoAttributeData = {
    resourceType: any;
    componentCount: number;
    normalize?: boolean;
    stride?: number;
    offset?: number;
  };

  export type UserGeoBufferData = {
    buffer: UserGeoResourceData;
    attributes: {
      [key: string]: UserGeoAttributeData;
    };
  };

  export type UserGeometryData = {
    identifier?: string;
    matrix?: Array<number>;
    volume?: Array<number>;
    appearance?: {
      diffuse?: Array<number>;
      emissive?: Array<number>;
      specular?: Array<number>;
    };
    selector?: string;
    enabled?: boolean;
    occluder?: boolean;
    geometry: {
      buffers: {
        [key: string]: UserGeoBufferData;
      };
      primitiveType?: any;
      numElements: number;
    };
    resources?: {
      [key: string]: any;
    };
    shader?: any;
  };
  export type UserGeoResourceData = {
    resourceType: any;
    data: number[];
  };

  /**
   * An object that specifies characteristics about the event listener
   */
  export type ContextCreatedListenerOptions = {
    /**
     * If true, the listener would be automatically removed when invoked.
     * @default false
     */
    once?: boolean;
  };
  /**
   * A listener function which can be registered with {@link addContextCreatedListener}.
   * @param {ContextAPI} context - The created Context.
   */
  export type ContextCreatedListener = (context: ContextAPI) => void;
  /**
   * Creates a new Context with the specified name and settings
   * @hidden
   * @param {string} name - Specifies the name of the context
   * @param {{[key in SettingStrings]? : any}} [settings = {}] - Specifies the settings for the context
   */
  export function createLegacyContext(name: string): ContextAPI | undefined;
  /**
   * Requests a new Context with the specified name and settings
   * @param {string} name - Specifies the name of the context
   * @param {{[key in SettingStrings]? : any}} [settings = {}] - Specifies the settings for the context
   */
  export function requestContext(
    name: string,
    settings?: {
      [key in SettingStrings | ViewerSettingStrings]?: any;
    }
  ): Promise<ContextAPI | undefined>;
  /**
   * Returns the Context with the specified name.
   * @param {string} name - Specifies the name for the context
   */
  export function getContext(name?: string): ContextAPI | undefined;
  /**
   * Returns a list of all available Context's
   */
  export function getContexts(): ContextAPI[];
  /**
   * Adds a listener function that will be called whenever a new Context is created.
   * @param {ContextCreatedListener} listener - The listener function that will be called whenever a new Context is created.
   * @param {ContextCreatedListenerOptions} options - Additional listener options.
   */
  export function addContextCreatedListener(
    listener: ContextCreatedListener,
    options?: ContextCreatedListenerOptions
  ): void;
  /**
   * Removes a previously added listener function.
   * @param {ContextCreatedListener} listener - The listener function which was added by {@link addContextCreatedListener} before.
   */
  export function removeContextCreatedListener(
    listener: ContextCreatedListener
  ): void;

  export const about: VersionInfo;
}
/**
 * @deprecated
 */
declare var webvisViewer: (identifier?: string) => webvis.ViewerAPI;
/**
 * @deprecated
 */
declare var webvisContext: (identifier?: string) => webvis.ContextAPI;
