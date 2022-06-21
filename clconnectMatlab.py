import sys                                          #node.js connectivity
import matlab.engine                                #matlab connectivity

arrayPy = sys.argv[1].split(',')
 
matlabEngine = matlab.engine.start_matlab()         #start matlab engine
matlabEngine.initcl(nargout=0)

matlabEngine.workspace['SetpointCl'] = float(arrayPy[0])       #important to send as float!
matlabEngine.workspace['InvSetpointCl'] = -float(arrayPy[0])
matlabEngine.workspace['Kp'] = float(arrayPy[1]) 
matlabEngine.workspace['Ki'] = float(arrayPy[2]) 

matlabEngine.simReadCl(nargout=0)     

print(matlabEngine.workspace['outputReadCl'])