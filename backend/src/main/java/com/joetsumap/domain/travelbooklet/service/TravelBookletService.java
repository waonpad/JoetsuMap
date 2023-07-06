package com.joetsumap.domain.travelbooklet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.joetsumap.common.file.service.Base64FileService;
import com.joetsumap.domain.travelbooklet.constant.TravelBookletConst;
import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.travelbooklet.payload.request.CreateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.request.UpdateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletDTO;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletPageResponse;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletResponse;
import com.joetsumap.domain.travelbooklet.repository.TravelBookletRepository;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.exception.exception.NotFoundException;
import com.joetsumap.exception.util.ExceptionUtil;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TravelBookletService {

  @Autowired
  TravelBookletRepository travelBookletRepository;

  @Autowired
  Base64FileService base64FileService;

  /**
   * 旅のしおりを全件取得する
   */
  public TravelBookletPageResponse findAll(Pageable pageable) {

    Page<TravelBooklet> travelBookletsPage = travelBookletRepository.findAll(pageable);

    // 内容をDTOに変える
    Page<TravelBookletDTO> travelBookletDTOPage = travelBookletsPage.map(travelBooklet -> {
      TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
      travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

      return travelBookletDTO;
    });

    return new TravelBookletPageResponse(travelBookletDTOPage);
  }

  /**
   * 旅のしおりをIDで取得する
   */
  public TravelBookletResponse findById(Long id) {

    TravelBooklet travelBooklet = travelBookletRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

    TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
    travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

    return new TravelBookletResponse(travelBookletDTO);
  }

  /**
   * 旅のしおりを作成する
   */
  public TravelBookletResponse create(UserDetailsImpl userDetails, CreateTravelBookletRequest createRequest) {

    String photoFileName = base64FileService.uploadImageFromBase64(createRequest.getPhoto(), TravelBookletConst.PHOTO_SAVE_DIR);

    TravelBooklet travelBooklet = new TravelBooklet();

    travelBooklet.setTitle(createRequest.getTitle());
    travelBooklet.setText(createRequest.getText());
    travelBooklet.setPhoto(photoFileName);
    travelBooklet.setAuthor(userDetails.getUser());

    travelBookletRepository.saveAndFlush(travelBooklet);
    
    TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
    travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

    return new TravelBookletResponse(travelBookletDTO);
  }

  /**
   * 旅のしおりを更新する
   */
  public TravelBookletResponse update(UserDetailsImpl userDetails, UpdateTravelBookletRequest updateRequest, Long id) {

    TravelBooklet travelBooklet = travelBookletRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

    ExceptionUtil.checkEqualsIdWithException(userDetails, travelBooklet.getAuthor().getId());

    travelBooklet.setTitle(updateRequest.getTitle());
    travelBooklet.setText(updateRequest.getText());

    // 画像が更新されている場合のみbase64エンコードされた文字列を受け取り、画像を更新する
    if (updateRequest.getPhoto() != null) {

      // TODO: base64形式ではない場合のエラー処理をする → FileUploadExceptionを作った

      String photoFileName = base64FileService.uploadImageFromBase64(updateRequest.getPhoto(), TravelBookletConst.PHOTO_SAVE_DIR);
      travelBooklet.setPhoto(photoFileName);
    }

    travelBookletRepository.saveAndFlush(travelBooklet);

    TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
    travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

    return new TravelBookletResponse(travelBookletDTO);
  }

  /**
   * 旅のしおりを削除する
   */
  public void delete(UserDetailsImpl userDetails, Long id) {

    TravelBooklet travelBooklet = travelBookletRepository.findById(id).orElseThrow(
      () -> new NotFoundException()
    );

    ExceptionUtil.checkEqualsIdWithException(userDetails, travelBooklet.getAuthor().getId());

    travelBookletRepository.delete(travelBooklet);
  }

  /**
   * ユーザーの作成した旅のしおりを全件取得する
   */
  public TravelBookletPageResponse findByAuthorId(Long authorId, Pageable pageable) {

    Page<TravelBooklet> travelBookletsPage = travelBookletRepository.findByAuthorId(authorId, pageable);

    Page<TravelBookletDTO> travelBookletDTOPage = travelBookletsPage.map(travelBooklet -> {
      TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
      travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

      return travelBookletDTO;
    });

    return new TravelBookletPageResponse(travelBookletDTOPage);
  }
}
