# Introduction
I have a HTML web page and Arduino with keyboard device, so the idea is whenever I press the keyboard, the value of the pressed button displayed on the webpage

# Requirements:
- node 18
- yarn 1.2.19
- Arduino device
- 4 x 4-key keyboard
- Arduino IDE

# Installation
```
git clone https://github.com/najmi9/arduino-nodejs-communication.git
yarn install
```

Go to port 3000.

make sure you have upload the code in `arduino_to_node.ino` to your Arduino device.

# Bonus
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

Who Am I?
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
