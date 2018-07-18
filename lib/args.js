const Args = function() {
  this.argv = false;
  this.actualString = "";
  this.startLoop = 2;
  this.commandPosition = 2;
  this.commands = ["store", "admin"];
  this.defaultCommand = "store";
  this.currentCommand = false;
};
/**
 * Defines and returns an object with cmd and str information from what user entered in the terminal.
 *
 * @return {Object} - {cmd, str}
 */
Args.prototype.resolve = function() {
  // Argunments globally available
  this.argv = process.argv;

  // Checking if user has specified the command on the terminal
  this._checkCommand();

  // You know what this does
  this._stringifyArgs();

  return {
    cmd: this.currentCommand,
    str: this.actualString
  };
};

Args.prototype._stringifyArgs = function() {
  this.actualString = this.argv.slice(this.startLoop).join("-");
};

/**
 * Checks if the user has specified the command to be executed.
 * If not, sets the object's current command to the default in case.
 */
Args.prototype._checkCommand = function() {
  let ok = this.commands.indexOf(this.argv[this.commandPosition]) >= 0;
  if (ok) {
    this.currentCommand = this.argv[this.commandPosition];
    this.startLoop++;
  } else {
    this.currentCommand = this.defaultCommand;
  }
};

module.exports = Args;
