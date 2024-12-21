import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/password/password.service';
import { MailService } from 'src/mail/mail.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'; // Import CloudinaryService

describe('StudentController', () => {
  let controller: StudentController;
  let cloudinaryService: CloudinaryService; // Declare CloudinaryService

  const mockStudentService = {
    findByStudentId: jest.fn(),
    create: jest.fn(),
    forgotPassword: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn(), // Mock cloudinaryService uploadImage method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        PasswordService,
        MailService,
        PrismaService,
        { provide: StudentService, useValue: mockStudentService },
        { provide: CloudinaryService, useValue: mockCloudinaryService }, // Provide mock cloudinaryService
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService); // Assign cloudinaryService
  });
  it('should throw NotFoundException if student is not found', async () => {
    const studentId = "non-existing-id";
    mockStudentService.findByStudentId.mockResolvedValue(null);

    await expect(controller.findStudentById(studentId)).rejects.toThrow(NotFoundException);
    expect(mockStudentService.findByStudentId).toHaveBeenCalledWith(studentId);
  });

  it('should upload the image and create a student', async () => {
    const mockFile = {
      path: 'fake-path', // Mocked file path
    } as Express.Multer.File;

    const mockCreateStudentDto = {
      name: 'John foo',
      email: 'johnbar@example.com',
      // Add other fields from CreateStudentDto as needed
    };

    const mockUploadApiResponse = {
      secure_url: 'http://fake-cloudinary-url.com/image.jpg', // Cloudinary API usually returns a secure_url field
    };

    // Mocking cloudinaryService to return a fake upload response
    jest.spyOn(cloudinaryService, 'uploadImage').mockResolvedValue(mockUploadApiResponse as any);

    // Mocking studentService.create to resolve successfully with the created student data
    mockStudentService.create.mockResolvedValue(mockCreateStudentDto);

    const result = await controller.create(mockCreateStudentDto as any);

    // Assertions to verify the behavior
    expect(cloudinaryService.uploadImage).toHaveBeenCalledWith(mockFile.path);
    expect(mockStudentService.create).toHaveBeenCalledWith(mockCreateStudentDto);
    expect(result).toEqual(mockCreateStudentDto);
  });



  it('should call forgotPassword with correct email', async () => {
    const email = 'test@example.com';
    mockStudentService.forgotPassword.mockResolvedValue({ message: 'Success' });

    const result = await controller.forgotPassword({ email });
    expect(result).toEqual({ message: 'Success' });
    expect(mockStudentService.forgotPassword).toHaveBeenCalledWith(email);
  });

  it('should return all students', async () => {
    const students = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    mockStudentService.findAll.mockResolvedValue(students);

    const result = await controller.findAll();
    expect(result).toEqual(students);
    expect(mockStudentService.findAll).toHaveBeenCalled();
  });

  it('should return a student by ID', async () => {
    const student = { id: '1', name: 'John Doe' };
    mockStudentService.findOne.mockResolvedValue(student);

    const result = await controller.findOne('1');
    expect(result).toEqual(student);
    expect(mockStudentService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a student by ID', async () => {
    const updateDto = { name: 'Updated Name' };
    const updatedStudent = { id: '1', ...updateDto };
    mockStudentService.update.mockResolvedValue(updatedStudent);

    const result = await controller.update('1', updateDto as any);
    expect(result).toEqual(updatedStudent);
    expect(mockStudentService.update).toHaveBeenCalledWith('1', updateDto);
  });

  it('should remove a student by ID', async () => {
    mockStudentService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
    expect(mockStudentService.remove).toHaveBeenCalledWith('1');
  });
});
