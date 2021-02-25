package com.ws.Q.A.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ws.Q.A.configuration.AppConfiguration;

@Service
public class FileService {
	
	@Autowired
	AppConfiguration appConfiguration;

	public String writeBase64EncodedStringToFile(String image) throws IOException {
		String fileName = generateRandomName();
		File target = new File(appConfiguration.getUploadPath() + "/" + fileName);
		OutputStream outputStream =  new FileOutputStream(target);
		
		byte[] base64encoded = java.util.Base64.getDecoder().decode(image);
				
		outputStream.write(base64encoded);
		outputStream.close();
		
		return fileName;
	}
	
	public String generateRandomName() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
}
