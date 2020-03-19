# Convert .pts file to .asc or .ascii file

It use node streams to be able to manage BIG file. 
Useful to convert a file from ArcGIS pts to a point and use it in MeshLab for example. 

**Input:** 

GRID_CODE= z
```
FID,POINTID,GRID_CODE,X,Y
0,1,2.115983960000000,364625.196000000000000,3777036
1,2,2.470673560000000,364630.196000000000000,3777036
```

**Output:**

format: `x y z`  separated by spaces, one point per line
```
364625.196000000000000 3777036 2.115983960000000 
364630.196000000000000 3777036 2.470673560000000 
364635.196000000000000 3777036 5.532944680000000 
```

#Install
0. Install node/npm
1. Clone this repo
2. Install dependencies: `npm i`
3. Copy your input .pts file into the same directory
4. Convert the file:   
   ```
   node index.js -f [YOUR_INPUT_FILE_WITH_EXTENSION]
   ```
5. Current working line will be logged in the terminal
6. Process is finished when "Read completed" and "Write finished" is displayed
7. New file name is `output.asc`

Example of the commande: `node index.js -f points.pts`
