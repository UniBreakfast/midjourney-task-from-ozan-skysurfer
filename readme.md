# [Midjourney Task from Ozan Skysurfer](https://github.com/unibreakfast/midjourney-task-from-ozan-skysurfer)

## Task Description

_There are two sections at midjourney.com/showcase.  In the upper right part of the page.  One tab recent as the other tab top. We want to periodically scan all the contents in these sections and automatically download them in the highest resolution if there are any new ones added._

### Requirements as I understand them

1. a nodeJS script that 
   1. gets the lists of image items from the recent and top tabs via API endpoints
   2. compares the lists with the lists stored during the previous runs
   3. downloads the new items in the highest resolution
2. a nodeJS script that
   1. runs the script from 1. periodically
   2. and works utill it is stopped