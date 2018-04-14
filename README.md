# simple_spaceships
A web-based space game.

## Notes:
* Use BufferGeometry and BufferAttribute for all objects since their geometry will not be manipulated after creation.
* To do the controls, add an invisible sphere to a camera and use that to determine velocity.
	* This uses raycasting and grouping.
	* Use layers to make invisible; "an object must share a layer with a camera to be visible".
* Use Group manipulate the camera and ship at the same time.
	* Need to figure out how to only sync movement of the ship (not rotation).
* To do the movement, get the POI and the camera location.  Have a global variable that is the speed.  Make a new Vector3 and pass it to a movement function. The movement function is called in the render loop (bad idea?).  The movement function takes the x,y,z of the Vector3 and translates the ship in those directions multiplied by the global speed.
* Look at this for models: https://github.com/Kyle-Cerniglia/EvE-3D-Printing

## Brainstorming:
* Can justify limiting the distance from stations and POI by having ships be induction powered.
	* This will make the universe feel small.  Doesn't account for bookmarks.
* To direction ship towards other ships and POI, we can place the icons on the direction sphere.

