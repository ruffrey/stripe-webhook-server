module.exports = function(){
	if(arguments[0])
	{
		return new Date(arguments[0]).toFormat('YYYY-MM-DD HH24:MI:SS');
	}
	return new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
};
