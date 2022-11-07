# [Midjourney Task from Ozan Skysurfer](https://github.com/unibreakfast/midjourney-task-from-ozan-skysurfer)

Run command: 

`node run-download-task-periodically`

## Task Description

_There are two sections at midjourney.com/showcase.  In the upper right part of the page.  One tab recent as the other tab top. We want to periodically scan all the contents in these sections and automatically download them in the highest resolution if there are any new ones added._

### Requirements as I understand them

1. a nodeJS script that 
   * gets the lists of image items from the recent and top tabs via API endpoints
   * compares the lists with the lists stored during the previous runs
   * downloads the new items in the highest resolution
2. a nodeJS script that
   * runs the script from 1. periodically
   * and works utill it is stopped

## Module Dependencies

![image](https://user-images.githubusercontent.com/19654456/200335660-f90f278b-13c9-486b-b2dd-d23e168d6a73.png)
