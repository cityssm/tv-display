<%
  response.contenttype = "application/json"

  response.write ("{""backgroundImages"":[")

  dim fileSystem, folder, currentFile
  set fileSystem = Server.CreateObject("Scripting.FileSystemObject")
  set folder = fileSystem.GetFolder(Server.MapPath("."))

  doComma = false

  for each currentFile in folder.files

    fileExtension = right(currentFile.Name, 4)

    if (fileExtension = ".jpg" or fileExtension = "png") then

      if (doComma) then
        response.write (",")
      else
        doComma = true
      end if

      response.write ("""" & currentFile.Name & """")

    end if
  next

  response.write ("]}")

  set folder = nothing
  set fileSystem = nothing
%>
