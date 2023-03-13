I have a HTML web page and Arduino with keyboard device, so the idea is whenever I press the keyboard, the value of the pressed button displayed on the webpage

The /dev/ttyACM0 device has the group of dialout:

```
$ stat /dev/ttyACM0
- sample output -
  File: /dev/ttyACM0
  Size: 0         	Blocks: 0          IO Block: 4096   character special file
Device: 6h/6d	Inode: 345         Links: 1     Device type: a6,0
Access: (0660/crw-rw----)  Uid: (    0/    root)   Gid: (   20/ dialout)
```
The members of the dialout group have full and direct access to serial ports.

To permanently solve the issue with the permissions for /dev/ttyACM0, all you need is to add your user to the dialout group:

```
sudo usermod -a -G dialout <username>
```

```
whoami
```

```
echo $USER
```

// Give other user the read and write permissions
```
sudo chmod a+rw /dev/ttyACM0
```
