import sys                                          #node.js connectivity
import matlab.engine                                #matlab connectivity
setpointPy = float(sys.argv[1])                     #we get the simulation/setpoint time from the server
matlabEngine = matlab.engine.start_matlab()         #start matlab engine
matlabEngine.init(nargout=0)

matlabEngine.workspace['Setpoint'] = setpointPy       #important to send as float!!!!
matlabEngine.workspace['InvSetpoint'] = -setpointPy

matlabEngine.simRead(nargout=0)     
plotArrayRead = matlabEngine.workspace['outputRead']


print(matlabEngine.workspace['outputRead'])



#---------------------------------------------------






#matlabEngine.workspace
#matlabEngine.workspace['Setpoint']
#matlabEngine.evalc('prj=openProject(fileparts("C:\\Users\\Usuario\\PycharmProjects\\TFG\\ReadProject"));')
#simOut = matlabEngine.sim("readValues",nargout=1)                      #simulate read model
#plotArrayRead = matlabEngine.workspace['outputRead']
#pyWorkspace = matlabEngine.workspace

#---------------------------------------------------------------
#import os
#import matlab.engine


#def readvalues(sampletime):
#    print(sampletime)
#    return "flagread"
#def writevalues(sampletime, setpoint):
#    print(sampletime + '/')
#    print(setpoint)
 #   return "flagwrite"


#readvalues("2000")
#writevalues("2000", 10)
#--------------------------------------------------
# import matlab
# thisDirectory = os.path.dirname(os.path.realpath('connectMatlab.py'))
# print(thisDirectory)
# thisDirectory = thisDirectory + '\JoinPython'

# print(thisDirectory)
# print('ºººººººººººººººººººººººººººººººººººº')
# matlabEngine = matlab.engine.start_matlab()
# matlabEngine.desktop(nargout=0)
# matlabEngine.evalc('cd C:\Users\Usuario\PycharmProjects\JoinPython')
# matlab.Engine.cd 'C:\Users\Usuario\PycharmProjects\TFGfinalProject'
# matlabEngine.evalc('prj=openProject(fileparts("' + thisDirectory + '"));')
# matlabEngine.open_system("firstTestWrite", nargout=0)

#   thisDirectory = os.path.dirname(os.path.realpath('writeValues.py'))
# matlabEngine.evalc('prj=openProject(fileparts("C:\Users\Usuario\PycharmProjects\JoinPython"));')


# thisDirectory = "C:\Users\Usuario\PycharmProjects\JoinPython"
