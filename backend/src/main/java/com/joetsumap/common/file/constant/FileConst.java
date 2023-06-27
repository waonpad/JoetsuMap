package com.joetsumap.common.file.constant;

public final class FileConst {

    private FileConst() {
        throw new IllegalStateException("Constants class");
    }

    public static final String MIMETYPE_JPEG = "image/jpeg";
    public static final String EXTENSION_JPEG = "jpeg";

    public static final String FILE_SAVE_DIR = "src/main/resources/static/";

    public static final String IMAGE_SAVE_DIR = FILE_SAVE_DIR + "images/";
    public static final String IMAGE_SAVE_FORMAT = ".jpeg";

}