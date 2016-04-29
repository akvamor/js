/**
 * Created by Dmytro_Petrov on 4/29/2016.
 */
var factory = (function RobotFactory(){
    var robots = [];
    var heightY = 100;
    var widthX = 100;
    var robotsKilled = [];
    var incrementer = 0;

    var damageFunction = function(robot){
        robot.life--;
        if (robot.life < 1){
            robots.reduceRight(function(acc, obj, idx) {
                if (obj.id == robot.id)
                    robots.splice(idx,1);
            }, 0);
            if (robotsKilled.indexOf(robot) == -1){
                robotsKilled[robotsKilled.length] = robot;
            }
            robot.direction = "";
            console.log("Robot with ID:" + robot.id + " has been killed.");
            return true;
        } else {
            console.log("Robot with ID:" + robot.id + " is on fire.");
            return false;
        }
    };

    return {
        createRobot: function(){
            var directionList = ["s", "e", "w", "n"],
                directionListInc = ["s", "n"],
                directionListDec = ["e", "w"];

            var newRobot = {
                id: incrementer++,
                x: 0,
                y: 0,
                killed: 0,
                direction: "s",
                numberSalve: 10,
                life: 1,
                go: function(direction){
                    console.log("Event go");
                    direction = direction.toLowerCase();
                    if (directionList.indexOf(direction) != -1){
                        this.direction = direction;
                    }
                    switch (direction){
                        case ("s"):
                            if (this.y > 0) {
                                this.y--;
                                break;
                            }
                        case ("w"):
                            if (this.x > 0 && direction == "w") {
                                this.x--;
                                break;
                            }
                        case ("e"):
                            if (this.y < heightY && direction == "e") {
                                this.x++;
                                break;
                            }
                        case ("n"):
                            if (this.x < widthX && direction == "n") {
                                this.y++;
                                break;
                            }
                            console.log("Robot is near the border. Change your direction.");
                            break;
                        default:
                            console.log("Can't understand direction");
                    };
                    console.log("Position X:" + this.x + " Y:" +this.y);
                },
                fire: function(){
                    if (this.numberSalve < 1){
                        console.log("Can't fire");
                        return;
                    }
                    if (robots.length == 1){
                        console.log("All hid.");
                        return;
                    }
                    this.numberSalve--;
                    for(var targetKey in robots){
                        var target = robots[targetKey];
                        if (this.id == target.id){
                            continue;
                        }
                        var isCatch = false;
                        switch (this.direction){
                            case "s":
                                if (target.y > this.y){
                                    break;
                                }
                            case "w":
                                if (target.x > this.x && this.direction == "w") {
                                    break;
                                }
                            case "n":
                                if (target.y < this.y && this.direction == "n") {
                                    break;
                                }
                            case "e":
                                if (target.x < this.x && this.direction == "e") {
                                    break;
                                }
                                if (damageFunction(target)){
                                    this.killed++;
                                };
                                isCatch = true
                                break;
                            default:
                                console.log("Can't fire");
                        }
                        if (isCatch){
                            break;
                        } else {
                            console.log("Missed");
                        }
                    }
                },
            };
            robots[robots.length] = newRobot;
            return newRobot;
        }
    }
})();

var robot1 = factory.createRobot();
console.log("Id" + robot1.id);
var robot2 = factory.createRobot();
console.log("Id" + robot2.id);
robot1.go("N");
robot1.go("n");
robot2.go("n");
robot2.fire();
robot2.fire();
robot2.go("n");
robot2.go("e");
var robot3 = factory.createRobot();
console.log("Id" + robot3.id);
robot3.go("e");
robot3.go("n");
robot3.fire();
